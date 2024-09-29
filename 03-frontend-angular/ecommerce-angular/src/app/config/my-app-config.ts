export default {

    oidc: {
        clientId: '0oac1xv78jEJHLiLn5d7',
        issuer: 'https://dev-68343085.okta.com/oauth2/default',
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email'],
        //responseType: 'code',  // Use Authorization Code Flow
        pkce: true
    }

}
export const myAppConfig = { /* your config object */ };
