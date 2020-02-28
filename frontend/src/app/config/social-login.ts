import { AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("109563906487-6i1rief06ses12jsg2bviv85o4638udd.apps.googleusercontent.com")
    }
]);

export function provideConfig() {
    return config;
}