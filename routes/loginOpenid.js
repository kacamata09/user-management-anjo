/* eslint-disable no-console, max-len, camelcase, no-unused-vars */
const { strict: assert } = require('assert');

const { urlencoded } = require('express'); // eslint-disable-line import/no-unresolved
const cariAkun = require('../pengguna/cariakun')

const body = urlencoded({ extended: false });




module.exports = (app, provider) => {
  const { constructor: { errors: { SessionNotFound } } } = provider;

  app.use((req, res, next) => {
    const orig = res.render;
    // you'll probably want to use a full blown render engine capable of layouts
    res.render = (view, locals) => {
      app.render(view, locals, (err, html) => {
        if (err) throw err;
        orig.call(res, '_layout', {
          ...locals,
          body: html,
        });
      });
    };
    next();
  });

  

  app.get('/interaction/:uid', async (req, res, next) => {
    try {
      const {
        uid, prompt, params, session,
      } = await provider.interactionDetails(req, res);
      
      
      const client = await provider.Client.find(params.client_id);

      const pesan = req.flash('pesan')
      switch (prompt.name) {
        case 'login': {
          return res.render('test_login.ejs', {
            pesan,
            client,
            uid,
            details: prompt.details,
            params,
            // session: session ? debug(session) : undefined,
           

          });
        }
        case 'consent': {
          console.log(session)
          return res.render('interaction.ejs', {
            client,
            redirect_uri:params.redirect_uri,
            akun_user: session.accountId,
            uid,
            details: prompt.details,
            params,
            // session: session ? debug(session) : undefined,
           
          });
        }
        default:
          return undefined;
      }
    } catch (err) {
      return next(err);
    }
  });

  app.post('/interaction/:uid/login', body, async (requ, resp, next) => {
    try {
      const {uid, prompt: { name }, params } = await provider.interactionDetails(requ, resp);
      assert.equal(name, 'login');
      // const account = await Account.findByLogin(requ.body.login);
      const account = await cariAkun.cariUser(requ.body.login, requ.body.password)
      // console.log(provider.interactionDetails())
      // console.log(account)
      
      if (account.pesan != undefined) {
        requ.flash('pesan', account.pesan)
        // resp.send(account.pesan)
        resp.redirect(`/interaction/${uid}`)
      } else {
        const result = {
          login: {
            accountId: account.email,
          },
        };
        await provider.interactionFinished(requ, resp, result, { mergeWithLastSubmission: false });
      }
   
    } catch (err) {
      next(err);
    }
  });

  app.post('/interaction/:uid/confirm', body, async (req, res, next) => {
    try {
      const interactionDetails = await provider.interactionDetails(req, res);
      console.log(interactionDetails)
      const { prompt: { name, details }, params, session: { accountId } } = interactionDetails;
      assert.equal(name, 'consent');

      console.log(interactionDetails)
      let { grantId } = interactionDetails;
      let grant;

      if (grantId) {
        // we'll be modifying existing grant in existing session
        grant = await provider.Grant.find(grantId);
      } else {
        // we're establishing a new grant
        grant = new provider.Grant({
          accountId,
          clientId: params.client_id,
        });
      }

      if (details.missingOIDCScope) {
        grant.addOIDCScope(details.missingOIDCScope.join(' '));
      }
      if (details.missingOIDCClaims) {
        grant.addOIDCClaims(details.missingOIDCClaims);
      }
      if (details.missingResourceScopes) {
        // eslint-disable-next-line no-restricted-syntax
        for (const [indicator, scopes] of Object.entries(details.missingResourceScopes)) {
          grant.addResourceScope(indicator, scopes.join(' '));
        }
      }

      grantId = await grant.save();

      const consent = {};
      if (!interactionDetails.grantId) {
        // we don't have to pass grantId to consent, we're just modifying existing one
        consent.grantId = grantId;
      }

      const result = { consent };
      await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: true });
    } catch (err) {
      next(err);
    }
  });

  app.get('/interaction/:uid/abort', async (req, res, next) => {
    try {
      const result = {
        error: 'access_denied',
        error_description: 'End-User aborted interaction',
      };
      await provider.interactionFinished(req, res, result, { mergeWithLastSubmission: false });

    } catch (err) {
      next(err);
    }
  });

// app.post('/token/revocation', (requ, resp) => {
//   resp.send('berhasil keluar')
// })
app.get('/keluar', async (requ, resp) => {
  // const cookiesesi = requ.cookies
  // cookiesesi.forEach(c => {
  //   resp.cookie(c, '', {expires: new Date(0)})
  // // })
  // resp.clearCookie('__legast')
  const {cookies} = requ
  if (cookies) {
    for (const i in cookies) {
      resp.clearCookie(i)
    }
  }
  // resp.send(cookies)
  // resp.send('anda sudah logout')
  const redirect_uri = requ.query.redirect_uri
  if (redirect_uri == undefined) {
    resp.redirect('/')
    return
  }
  resp.redirect(redirect_uri)
  return
})

  app.use((err, req, res, next) => {
    if (err instanceof SessionNotFound) {
      // handle interaction expired / session not found error
      return res.send('sesi tidak ditemukan')
      // return res.render('test_login.ejs')
    }
    next(err);
  });
};
