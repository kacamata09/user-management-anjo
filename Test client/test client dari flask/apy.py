from flask import Flask, url_for, session, request, jsonify
from flask import render_template, redirect
from authlib.integrations.flask_client import OAuth
from authlib.integrations.requests_client import OAuth2Session
import jwt


app = Flask(__name__)
app.secret_key = '!secret'
# app.config.from_object('config')

client = OAuth2Session(
    'client_id', 'client_secret',
    token_endpoint_auth_method="client_secret_basic",
)

CONF_URL = 'http://localhost:3000/oidc/.well-known/openid-configuration'
oauth = OAuth(app)
oauth.register(
    name='webflask',
    # client_id='oidcCLIENT2',
    # client_secret='Some_super_secret',
    client_id='vyTYXCtCMai8UC1gJpIwDcDi8Cb',
    client_secret='cdLgXzUow8mOdp3TIV0vSlM872v',
    # client_id_issued_at=1666277957,
    # redirect_uris=["http://localhost:4900/auth"],
    # client_secret_expires_at=0,
    server_metadata_url=CONF_URL,
    client_kwargs={
        'scope': 'openid'
    },
    # access_token_url="http://localhost:3000/oidc/token",
    # request_token_url="http://localhost:4900/auth"

)


@app.route('/')
def homepage():
    user = session.get('id')

    return render_template('home.html', user=user)


@app.route('/login')
def login():
    # redirect_uri = url_for('auth')
    redirect_uri = 'http://localhost:4900/auth'
    return oauth.webflask.authorize_redirect(redirect_uri)


@app.route('/auth')
def auth():
    # arg = request.url
    # print(arg)
    # parsing = client.fetch_token(
    #     'http://localhost:3000/oidc/token', arg)

    # print(parsing)
    try:
        # token = oauth.webflask.authorize_access_token()
        token = oauth.webflask.authorize_access_token()
        resp = oauth.webflask.get()
        resp.raise_for_status()
        profile = resp.json()
        print(profile)
        # print(token)
        # resp = oauth.webflask.get('')
        # print(resp)
        print(token)
        # user = token['userinfo']
        # userPar = jwt.decode(
        #     user, 'cdLgXzUow8mOdp3TIV0vSlM872v', algorithms=['RS256'])
        # print(userPar)
        print(request.url)
        # print(user.parse)

        # resp.raise_for_status()
        # profile = resp.json()
        # print(profile)

        session['id'] = token['access_token']
        # return redirect('/beranda')
        return token
    except:
        redirect_uri = 'http://localhost:4900/auth'
        # return redirect('/auth')
        return oauth.webflask.authorize_redirect(redirect_uri)
        # return redirect('/')


@app.route('/beranda')
def index():
    if 'id' not in session:
        return '<h1>anda belum login</h1>'
    # print(session)
    return '<h1>Youkoso boukensha tachi</h1>'


@app.route('/logout')
def logout():
    # client.revoke_token(
    #     'http://localhost:3000/oidc/token', token=session['id'])
    session.pop('id', None)
    return redirect('/')


if __name__ == '__main__':
    app.run(debug=True, port=4900)
