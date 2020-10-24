// import nodemailer, { Transporter } from 'nodemailer';
// import { injectable, inject } from 'tsyringe';

// import fs from 'fs';
// import readline from 'readline';
// import { google } from 'googleapis';

// import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
// import ISendMailDTO from '../dtos/ISendMailDTO';

// @injectable()
// export default class GoogleMailProvider {
//   private client: Transporter;

//   constructor(
//     @inject('MailTemplateProvider')
//     private mailTemplateProvider: IMailTemplateProvider,
//   ) {}

//   public async sendMail({
//     to,
//     from,
//     subject,
//     templateData,
//   }: ISendMailDTO): Promise<void> {

//     const SCOPES = ['https://www.googleapis.com/auth/gmail'];

//     const TOKEN_PATH = 'token.json';

//     fs.readFile('credentials.json', (err, content) => {
//       if (err) return console.log('Error loading client secret file:', err);
//       // Authorize a client with credentials, then call the Gmail API.
//       authorize(JSON.parse(content), listLabels);
//     });

//     function authorize(credentials, callback) {
//       const {client_secret, client_id, redirect_uris} = credentials.installed;
//       const oAuth2Client = new google.auth.OAuth2(
//           client_id, client_secret, redirect_uris[0]);

//       // Check if we have previously stored a token.
//       fs.readFile(TOKEN_PATH, (err, token) => {
//         if (err) return getNewToken(oAuth2Client, callback);
//         oAuth2Client.setCredentials(JSON.parse(token));
//         callback(oAuth2Client);
//       });
//     }

//     function getNewToken(oAuth2Client, callback) {
//       const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPES,
//       });
//       console.log('Authorize this app by visiting this url:', authUrl);
//       const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//       });
//       rl.question('Enter the code from that page here: ', (code) => {
//         rl.close();
//         oAuth2Client.getToken(code, (err, token) => {
//           if (err) return console.error('Error retrieving access token', err);
//           oAuth2Client.setCredentials(token);
//           // Store the token to disk for later program executions
//           fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
//             if (err) return console.error(err);
//             console.log('Token stored to', TOKEN_PATH);
//           });
//           callback(oAuth2Client);
//         });
//       });
//     }

//     function listLabels(auth) {
//       const gmail = google.gmail({version: 'v1', auth});
//       gmail.users.labels.list({
//         userId: 'me',
//       }, (err, res) => {
//         if (err) return console.log('The API returned an error: ' + err);
//         const labels = res.data.labels;
//         if (labels.length) {
//           console.log('Labels:');
//           labels.forEach((label) => {
//             console.log(`- ${label.name}`);
//           });
//         } else {
//           console.log('No labels found.');
//         }
//       });

// }
