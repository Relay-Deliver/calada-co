const KLAVIYO_KEY = 'TG5dxB';
const LIST_ID = 'QNCvtd';

// Subscribe email to CalAda newsletter list
export async function subscribeToNewsletter(email, firstName = '') {
  if (!email) return;
  try {
    await fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${KLAVIYO_KEY}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'revision': '2023-12-15',
      },
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email,
                  first_name: firstName,
                  properties: { source: 'CalAda Website Signup' },
                },
              },
            },
          },
          relationships: {
            list: {
              data: { type: 'list', id: LIST_ID },
            },
          },
        },
      }),
    });
    return { success: true };
  } catch (err) {
    console.error('Klaviyo subscribe error:', err);
    return { success: false };
  }
}

// Track new account registration — triggers welcome email flow in Klaviyo
export async function trackNewRegistration(email, firstName, lastName) {
  if (!email) return;
  try {
    await fetch(`https://a.klaviyo.com/client/events/?company_id=${KLAVIYO_KEY}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'revision': '2023-12-15',
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            metric: {
              data: {
                type: 'metric',
                attributes: { name: 'CalAda Registration' },
              },
            },
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email,
                  first_name: firstName,
                  last_name: lastName,
                },
              },
            },
            properties: { source: 'Account Registration' },
          },
        },
      }),
    });
    return { success: true };
  } catch (err) {
    console.error('Klaviyo track error:', err);
    return { success: false };
  }
}