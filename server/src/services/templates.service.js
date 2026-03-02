export const newsLatterTemplate = ({ unSubscribeUrl, websiteUrl }) => {
  // Brand Colors based on your provided CSS variables
  const colors = {
    background: "#fafaf9", // Pale Cream
    foreground: "#364219", // Deep Moss
    primary: "#5c6f2b",    // Olive
    muted: "#6b7750",      // Lighter Moss
    accent: "#eab308",     // Sun Yellow
    border: "#d6dbc8"      // Soft border
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Sasya Marg</title>
</head>
<body style="margin:0; padding:0; background-color:${colors.background}; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: ${colors.foreground};">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background}; padding: 40px 10px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border: 1px solid ${colors.border}; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(54,66,25,0.05);">
        
        <tr>
          <td align="center" style="padding: 40px 20px; background-color: #ffffff; border-bottom: 1px solid ${colors.background};">
            <div style="display: inline-block; padding: 12px; border-radius: 10px; margin-bottom: 15px;">
               <img src="https://res.cloudinary.com/dq0ltmja4/image/upload/v1772435826/sasyamarg_logo_wtzjzu.png" width="60" height="60" alt="Sasya Marg Logo" style="display: block;">
            </div>
            <h1 style="margin:0; font-size:24px; color:${colors.foreground}; font-weight: 700; letter-spacing: -0.5px;">Sasya Marg</h1>
            <p style="margin:5px 0 0 0; font-size:14px; color:${colors.muted}; text-transform: uppercase; letter-spacing: 1.5px;">Path of crop</p>
          </td>
        </tr>

        <tr>
          <td style="padding: 40px 40px 20px 40px;">
            <h2 style="margin:0 0 15px 0; font-size:22px; color:${colors.primary};">Welcome to the future of farming.</h2>
            <p style="margin:0; font-size:16px; line-height:1.6; color:${colors.foreground};">
              Hello there! You’ve successfully subscribed to the Sasya Marg newsletter. You are now part of an ecosystem dedicated to bridging the gap between traditional farming and modern AI insights.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding: 0 40px 30px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding: 15px; background-color: ${colors.background}; border-radius: 8px;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="font-size: 15px; line-height: 1.6;">
                        <div style="margin-bottom: 8px; font-weight: bold; color: ${colors.primary};">🌱 AI-Powered Crop Suggestions</div>
                        <div style="margin-bottom: 8px; font-weight: bold; color: ${colors.primary};">📈 Real-time Mandi Price Analytics</div>
                        <div style="margin-bottom: 8px; font-weight: bold; color: ${colors.primary};">🏛 Verified Government Schemes</div>
                        <div style="font-weight: bold; color: ${colors.primary};">🚜 Precision Agriculture Tips</div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding: 10px 40px 40px 40px;">
            <a href="${websiteUrl}" style="display:inline-block; padding:16px 36px; background-color:${colors.primary}; color:#ffffff; text-decoration:none; font-size:16px; border-radius:8px; font-weight:600; box-shadow: 0 4px 10px rgba(92, 111, 43, 0.2);">
              Access Your Dashboard
            </a>
            <p style="margin-top: 20px; font-size: 13px; color: ${colors.muted};">
              Explore smart tools designed specifically for your soil and region.
            </p>
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: #f9fafb; padding: 30px; border-top: 1px solid ${colors.border};">
            <p style="margin:0 0 10px 0; font-size:12px; color:${colors.muted}; line-height: 1.5;">
              You received this because you signed up via the Sasya Marg portal.<br>
              Empowering farmers through data-driven decisions.
            </p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding-right: 15px;">
                  <a href="${websiteUrl}" style="font-size:12px; color:${colors.primary}; text-decoration:none; font-weight:600;">Website</a>
                </td>
                <td style="border-left: 1px solid ${colors.border}; padding-left: 15px;">
                  <a href="${unSubscribeUrl}" style="font-size:12px; color:${colors.muted}; text-decoration:none;">Unsubscribe</a>
                </td>
              </tr>
            </table>
            <p style="margin:20px 0 0 0; font-size:11px; color:${colors.muted}; opacity: 0.7;">
              © 2026 Sasya Marg. All Rights Reserved.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
};


export const registrationTemplate = ({ userName, loginUrl, websiteUrl }) => {
  const colors = {
    background: "#fafaf9", // Pale Cream
    foreground: "#364219", // Deep Moss
    primary: "#5c6f2b",    // Olive
    muted: "#6b7750",      // Lighter Moss
    accent: "#eab308",     // Sun Yellow
    border: "#d6dbc8",     // Soft border
    white: "#ffffff"
  };

  const logoUrl = "https://res.cloudinary.com/dq0ltmja4/image/upload/v1772435826/sasyamarg_logo_wtzjzu.png";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to Sasya Marg</title>
</head>
<body style="margin:0; padding:0; background-color:${colors.background}; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: ${colors.foreground};">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${colors.background}; padding: 40px 10px;">
  <tr>
    <td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:${colors.white}; border: 1px solid ${colors.border}; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(54,66,25,0.04);">
        
        <tr>
          <td align="center" style="padding: 40px 20px; border-bottom: 1px solid ${colors.background};">
            <img src="${logoUrl}" alt="Sasya Marg Logo" width="180" style="display: block; max-width: 100%; height: auto;">
          </td>
        </tr>

        <tr>
          <td style="padding: 40px 40px 10px 40px;">
            <h1 style="margin:0 0 15px 0; font-size:24px; color:${colors.foreground}; font-weight: 700;">Account Created Successfully!</h1>
            <p style="margin:0; font-size:16px; line-height:1.6; color:${colors.foreground};">
              Hello <strong>${userName || 'Farmer'}</strong>,
            </p>
            <p style="margin:15px 0 0 0; font-size:16px; line-height:1.6; color:${colors.foreground};">
              Welcome to <strong>Sasya Marg</strong>. We are excited to help you transform your agricultural journey with data-driven insights and AI-powered crop management.
            </p>
          </td>
        </tr>

        <tr>
          <td style="padding: 30px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${colors.background}; border-radius: 8px;">
              <tr>
                <td style="padding: 20px;">
                  <h3 style="margin:0 0 10px 0; font-size:14px; text-transform: uppercase; letter-spacing: 1px; color:${colors.primary};">Getting Started:</h3>
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="24" valign="top" style="padding-top: 4px;">✅</td>
                      <td style="padding-bottom: 10px; font-size: 15px;">Complete your <strong>Farm Profile</strong> for better suggestions.</td>
                    </tr>
                    <tr>
                      <td width="24" valign="top" style="padding-top: 4px;">✅</td>
                      <td style="padding-bottom: 10px; font-size: 15px;">Check <strong>Real-time Mandi Prices</strong> for your region.</td>
                    </tr>
                    <tr>
                      <td width="24" valign="top" style="padding-top: 4px;">✅</td>
                      <td style="font-size: 15px;">Explore <strong>Government Schemes</strong> curated for you.</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td align="center" style="padding: 10px 40px 40px 40px;">
            <a href="${loginUrl}" style="display:inline-block; padding:16px 40px; background-color:${colors.primary}; color:${colors.white}; text-decoration:none; font-size:16px; border-radius:6px; font-weight:600;">
              Login to Your Dashboard
            </a>
            <p style="margin-top: 25px; font-size: 14px; color: ${colors.muted};">
              Need help? Reach out to us at <a href="mailto:support@sasyamarg.com" style="color:${colors.primary}; text-decoration:none;">support@sasyamarg.com</a>
            </p>
          </td>
        </tr>

        <tr>
          <td align="center" style="background-color: ${colors.foreground}; padding: 30px;">
            <p style="margin:0 0 10px 0; font-size:12px; color:${colors.white}; opacity: 0.8;">
              Sasya Marg — Empowering Farmers with Agri-Intelligence
            </p>
            <table cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <a href="${websiteUrl}" style="font-size:12px; color:${colors.white}; text-decoration:none; margin-right: 15px;">Official Website</a>
                </td>
                <td style="border-left: 1px solid rgba(255,255,255,0.2); padding-left: 15px;">
                  <a href="${websiteUrl}/privacy" style="font-size:12px; color:${colors.white}; text-decoration:none;">Privacy Policy</a>
                </td>
              </tr>
            </table>
            <p style="margin:20px 0 0 0; font-size:11px; color:${colors.white}; opacity: 0.5;">
              © 2026 Sasya Marg. All Rights Reserved.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;
};