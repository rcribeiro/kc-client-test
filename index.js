(async () => {
  const { default: fetch, Headers } = await import('node-fetch');
  const FormData = (await import('form-data')).default;
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.FormData = FormData;

  const { default: KcAdminClient } = await import('@keycloak/keycloak-admin-client');

  const KC_BASE_URL = process.env.KC_BASE_URL;
  const KC_REALM = process.env.KC_REALM;
  const KC_REALM_USER = process.env.KC_REALM_USER;
  const KC_REALM_PASS = process.env.KC_REALM_PASS;

  const kcAdminClient = new KcAdminClient({
    baseUrl: KC_BASE_URL,
    realmName: KC_REALM,
  });

  try {
    await kcAdminClient.auth({
      username: KC_REALM_USER,
      password: KC_REALM_PASS,
      grantType: 'password',
      clientId: 'admin-cli',
    });

    const users = await kcAdminClient.users.find({ first: 0, max: 10 });
    console.log(users);
  } catch (error) {
    console.error(error);
  }
})();
