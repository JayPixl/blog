import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
})

export const emailTemplate = (
    verifyCode: string,
    userId: string
) => `<!DOCTYPE html>
<html
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    lang="en"
>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <!--[if mso
            ]><xml
                ><o:OfficeDocumentSettings
                    ><o:PixelsPerInch>96</o:PixelsPerInch
                    ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <style>
            * {
                box-sizing: border-box;
            }

            body {
                margin: 0;
                padding: 0;
            }

            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
            }

            #MessageViewBody a {
                color: inherit;
                text-decoration: none;
            }

            p {
                line-height: inherit;
            }

            .desktop_hide,
            .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
            }

            .image_block img + div {
                display: none;
            }

            @media (max-width: 620px) {
                .desktop_hide table.icons-inner {
                    display: inline-block !important;
                }

                .icons-inner {
                    text-align: center;
                }

                .icons-inner td {
                    margin: 0 auto;
                }

                .mobile_hide {
                    display: none;
                }

                .row-content {
                    width: 100% !important;
                }

                .stack .column {
                    width: 100%;
                    display: block;
                }

                .mobile_hide {
                    min-height: 0;
                    max-height: 0;
                    max-width: 0;
                    overflow: hidden;
                    font-size: 0px;
                }

                .desktop_hide,
                .desktop_hide table {
                    display: table !important;
                    max-height: none !important;
                }
            }
        </style>
    </head>

    <body
        style="
            background-color: #e7e5e4;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: none;
            text-size-adjust: none;
        "
    >
        <table
            class="nl-container"
            width="100%"
            border="0"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #e7e5e4;
            "
        >
            <tbody>
                <tr>
                    <td>
                        <table
                            class="row row-1"
                            align="center"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <table
                                            class="row-content stack"
                                            align="center"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                background-color: #f1efef;
                                                color: #000000;
                                                width: 600px;
                                                margin: 0 auto;
                                            "
                                            width="600"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td
                                                        class="column column-1"
                                                        width="100%"
                                                        style="
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            font-weight: 400;
                                                            text-align: left;
                                                            padding-bottom: 5px;
                                                            padding-top: 5px;
                                                            vertical-align: top;
                                                            border-top: 0px;
                                                            border-right: 0px;
                                                            border-bottom: 0px;
                                                            border-left: 0px;
                                                        "
                                                    >
                                                        <table
                                                            class="heading_block block-1"
                                                            width="100%"
                                                            border="0"
                                                            cellpadding="10"
                                                            cellspacing="0"
                                                            role="presentation"
                                                            style="
                                                                mso-table-lspace: 0pt;
                                                                mso-table-rspace: 0pt;
                                                            "
                                                        >
                                                            <tr>
                                                                <td class="pad">
                                                                    <h1
                                                                        style="
                                                                            margin: 0;
                                                                            color: #403c39;
                                                                            direction: ltr;
                                                                            font-family: 'Courier New',
                                                                                Courier,
                                                                                'Lucida Sans Typewriter',
                                                                                'Lucida Typewriter',
                                                                                monospace;
                                                                            font-size: 38px;
                                                                            font-weight: 700;
                                                                            letter-spacing: normal;
                                                                            line-height: 120%;
                                                                            text-align: center;
                                                                            margin-top: 0;
                                                                            margin-bottom: 0;
                                                                            mso-line-height-alt: 45.6px;
                                                                        "
                                                                    >
                                                                        <span
                                                                            class="tinyMce-placeholder"
                                                                            ><span
                                                                                style="
                                                                                    color: #4f46e5;
                                                                                "
                                                                                >jpxl</span
                                                                            >.dev</span
                                                                        >
                                                                    </h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table
                            class="row row-2"
                            align="center"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <table
                                            class="row-content stack"
                                            align="center"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                background-color: #4f46e5;
                                                color: #000000;
                                                width: 600px;
                                                margin: 0 auto;
                                            "
                                            width="600"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td
                                                        class="column column-1"
                                                        width="100%"
                                                        style="
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            font-weight: 400;
                                                            text-align: left;
                                                            padding-bottom: 2px;
                                                            padding-top: 2px;
                                                            vertical-align: top;
                                                            border-top: 0px;
                                                            border-right: 0px;
                                                            border-bottom: 0px;
                                                            border-left: 0px;
                                                        "
                                                    >
                                                        <div
                                                            class="spacer_block block-1"
                                                            style="
                                                                height: 1px;
                                                                line-height: 1px;
                                                                font-size: 1px;
                                                            "
                                                        >
                                                            &#8202;
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table
                            class="row row-3"
                            align="center"
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                        >
                            <tbody>
                                <tr>
                                    <td>
                                        <table
                                            class="row-content stack"
                                            align="center"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            role="presentation"
                                            style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                background-color: #f1efef;
                                                color: #000000;
                                                width: 600px;
                                                margin: 0 auto;
                                            "
                                            width="600"
                                        >
                                            <tbody>
                                                <tr>
                                                    <td
                                                        class="column column-1"
                                                        width="100%"
                                                        style="
                                                            mso-table-lspace: 0pt;
                                                            mso-table-rspace: 0pt;
                                                            font-weight: 400;
                                                            text-align: left;
                                                            padding-bottom: 5px;
                                                            padding-top: 5px;
                                                            vertical-align: top;
                                                            border-top: 0px;
                                                            border-right: 0px;
                                                            border-bottom: 0px;
                                                            border-left: 0px;
                                                        "
                                                    >
                                                        <div
                                                            class="spacer_block block-1"
                                                            style="
                                                                height: 60px;
                                                                line-height: 60px;
                                                                font-size: 1px;
                                                            "
                                                        >
                                                            &#8202;
                                                        </div>
                                                        <table
                                                            class="text_block block-2"
                                                            width="100%"
                                                            border="0"
                                                            cellpadding="10"
                                                            cellspacing="0"
                                                            role="presentation"
                                                            style="
                                                                mso-table-lspace: 0pt;
                                                                mso-table-rspace: 0pt;
                                                                word-break: break-word;
                                                            "
                                                        >
                                                            <tr>
                                                                <td class="pad">
                                                                    <div
                                                                        style="
                                                                            font-family: sans-serif;
                                                                        "
                                                                    >
                                                                        <div
                                                                            class
                                                                            style="
                                                                                font-size: 12px;
                                                                                font-family: Arial,
                                                                                    Helvetica,
                                                                                    sans-serif;
                                                                                mso-line-height-alt: 14.399999999999999px;
                                                                                color: #555555;
                                                                                line-height: 1.2;
                                                                            "
                                                                        >
                                                                            <p
                                                                                style="
                                                                                    margin: 0;
                                                                                    font-size: 16px;
                                                                                    text-align: center;
                                                                                    mso-line-height-alt: 19.2px;
                                                                                "
                                                                            >
                                                                                <em
                                                                                    ><strong
                                                                                        >WELCOME
                                                                                        TO
                                                                                        JPXL.DEV!</strong
                                                                                    ></em
                                                                                >
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table
                                                            class="text_block block-3"
                                                            width="100%"
                                                            border="0"
                                                            cellpadding="10"
                                                            cellspacing="0"
                                                            role="presentation"
                                                            style="
                                                                mso-table-lspace: 0pt;
                                                                mso-table-rspace: 0pt;
                                                                word-break: break-word;
                                                            "
                                                        >
                                                            <tr>
                                                                <td class="pad">
                                                                    <div
                                                                        style="
                                                                            font-family: sans-serif;
                                                                        "
                                                                    >
                                                                        <div
                                                                            class
                                                                            style="
                                                                                font-size: 12px;
                                                                                font-family: Arial,
                                                                                    Helvetica,
                                                                                    sans-serif;
                                                                                mso-line-height-alt: 14.399999999999999px;
                                                                                color: #555555;
                                                                                line-height: 1.2;
                                                                            "
                                                                        >
                                                                            <p
                                                                                style="
                                                                                    margin: 0;
                                                                                    font-size: 14px;
                                                                                    text-align: center;
                                                                                    mso-line-height-alt: 16.8px;
                                                                                "
                                                                            >
                                                                                Please
                                                                                click
                                                                                the
                                                                                verify
                                                                                button
                                                                                below
                                                                                to
                                                                                finish
                                                                                the
                                                                                registration
                                                                                process!
                                                                                If
                                                                                it
                                                                                does
                                                                                not
                                                                                work
                                                                                then
                                                                                copy/paste
                                                                                the
                                                                                following
                                                                                url
                                                                                into
                                                                                your
                                                                                browser:
                                                                                https://blog.jpxl.dev/verify/${userId}/${verifyCode}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <table
                                                            class="button_block block-4"
                                                            width="100%"
                                                            border="0"
                                                            cellpadding="10"
                                                            cellspacing="0"
                                                            role="presentation"
                                                            style="
                                                                mso-table-lspace: 0pt;
                                                                mso-table-rspace: 0pt;
                                                            "
                                                        >
                                                            <tr>
                                                                <td class="pad">
                                                                    <div
                                                                        class="alignment"
                                                                        align="center"
                                                                    >
                                                                        <!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.blog.jpxl.dev/verify/${userId}/${verifyCode}" style="height:42px;width:141px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#4f46e5">
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px">
<!
                                                                        [endif]--><a
                                                                            href="https://www.blog.jpxl.dev/verify/${userId}/${verifyCode}"
                                                                            target="_blank"
                                                                            style="
                                                                                text-decoration: none;
                                                                                display: inline-block;
                                                                                color: #ffffff;
                                                                                background-color: #4f46e5;
                                                                                border-radius: 4px;
                                                                                width: auto;
                                                                                border-top: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                font-weight: 400;
                                                                                border-right: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-bottom: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                border-left: 0px
                                                                                    solid
                                                                                    transparent;
                                                                                padding-top: 5px;
                                                                                padding-bottom: 5px;
                                                                                font-family: Arial,
                                                                                    Helvetica,
                                                                                    sans-serif;
                                                                                font-size: 16px;
                                                                                text-align: center;
                                                                                mso-border-alt: none;
                                                                                word-break: keep-all;
                                                                            "
                                                                            ><span
                                                                                style="
                                                                                    padding-left: 20px;
                                                                                    padding-right: 20px;
                                                                                    font-size: 16px;
                                                                                    display: inline-block;
                                                                                    letter-spacing: normal;
                                                                                "
                                                                                ><span
                                                                                    style="
                                                                                        word-break: break-word;
                                                                                        line-height: 32px;
                                                                                    "
                                                                                >
                                                                                    Verify
                                                                                    Account
                                                                                </span>
                                                                            </span></a
                                                                        >
                                                                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <div
                                                            class="spacer_block block-5"
                                                            style="
                                                                height: 60px;
                                                                line-height: 60px;
                                                                font-size: 1px;
                                                            "
                                                        >
                                                            &#8202;
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- End -->
    </body>
</html>
`

export const sendEmail = async (
    recipient: string,
    subject: string,
    text: string,
    html: string
) => {
    try {
        await transporter.sendMail({
            from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
            //from: `"JXPL.DEV" <noreply@jpxl.dev>`,
            to: recipient,
            subject,
            text,
            html
        })
    } catch (e) {
        console.log(e)
    }
}

export const sendVerifyEmail: (
    toName: string,
    toEmail: string,
    verifyCode: string,
    userId: string
) => Promise<any> = async (toName, toEmail, verifyCode, userId) => {
    await sendEmail(
        toEmail,
        "Please verify your JPXL.DEV account!",
        `WELCOME TO JPXL.DEV!\nPlease copy/paste the following url into your browser to verify your account: https://blog.jpxl.dev/verify/${userId}/${verifyCode}`,
        emailTemplate(verifyCode, userId)
    )
}
