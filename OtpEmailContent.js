let htmlTemplate = `
<td>
  <div><div></div></div>
  <table
    border="0"
    cellspacing="0"
    cellpadding="0"
    style="padding-bottom: 20px; max-width: 516px; min-width: 220px"
  >
    <tbody>
      <tr>
        <td width="8" style="width: 8px"></td>
        <td>
          <div
            style="
              width:100%;
              border-style: solid;
              border-width: thin;
              border-color: #c1c2c5;
              border-radius: 8px;
              padding: 40px 20px;
              align-self: center;
              margin-left: 20; "
          >
            
            <div
              style="
                font-family: 'Google Sans', Roboto, RobotoDraft, Helvetica,
                  Arial, sans-serif;
                border-bottom: thin solid #dadce0;
                color: rgba(0, 0, 0, 0.87);
                line-height: 32px;
                padding-bottom: 24px;
                text-align: center;
                word-break: break-word;
              "
            >
              <div style="font-size: 24px">Verify your  email</div>
            </div>

            <div
              style="
                font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
                font-size: 14px;
                color: rgb(0, 0, 0);
                line-height: 20px;
                padding-top: 20px;
                text-align: left;
              "
            >
              <div style="color: black;">


                <a>OTP to login in  </a> 
                <a style="font-weight: bold">Cultura Bot</a
              > is <br />

              </div>

              <div
                style="
                  text-align: center;
                  font-size: 36px;
                  margin-top: 20px;
                  line-height: 44px;">
                {{otp}}
              </div>


              <br/><a> code will expire in 24 hours. </a><br /><br />
              
            </div>
          </div>
          <div style="text-align: left">
            <div
              style="
                font-family: Roboto-Regular, Helvetica, Arial, sans-serif;
                color: rgba(0, 0, 0, 0.54);
                font-size: 11px;
                line-height: 18px;
                padding-top: 12px;
                text-align: center;
              "
            >
            </div>
          </div>
        </td>
        <td width="8" style="width: 8px"></td>
      </tr>
    </tbody>
  </table>
</td>`


module.exports = htmlTemplate