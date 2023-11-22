export const htmlTemplate = () => {
  const temp = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<h1 style="text-align: center; font-size:35px; margin:15px;">Nute Payment Reciept</h1>

    <table style="width: 100%; border-collapse: collapse; border: 1px solid #535852;">
        <tbody>
            <tr>
                <td style="text-align: center; padding: 15px; border-bottom: 1px solid #535852;">
                    <h1 style="color: #535852; font-size: 16px; font-weight: 600;">PAYMENT DETAILS</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 0 15px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr style="border-bottom: 1px solid #535852;">
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; border-right: 1px solid #535852;">Recharge Amount</td>
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; text-align: right;"><span style="font-size: 12px; color: #000;">₹</span> 1000</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #535852;">
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; border-right: 1px solid #535852;">TDS (1%)</td>
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; text-align: right;">100</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #535852;">
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; border-right: 1px solid #535852;">Service Tax</td>
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; text-align: right;"><span style="font-size: 12px; color: #000;">₹</span> 6</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #535852;">
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; border-right: 1px solid #535852;">Total (Rs.)</td>
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; text-align: right;">1000</td>
                        </tr>
                        <tr>
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; border-right: 1px solid #535852;">Total (BNB)</td>
                            <td style="font-size: 16px; color: #535852; padding: 7px 0; text-align: right;">0.01</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>
`;
  return temp;
};
