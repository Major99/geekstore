     #Steps to setup locally

 <b>1.clone this repository</b>
<br />
 <b>2.run command</b>
<br />

      npm install

inside root directory of this cloned repository
<br />
 <b>3.create .env file inside root directory ...
   and write below code inside .env</b>

    NODE_ENV=development
    PORT=8000
    CLIENT_URL=http://localhost:3000
    DATABASE=mongodb://127.0.0.1:27017/Ecommerce
    SENDGRID_API_KEY=
    JWT_SECRET=26782938746T7WUHSXBVH
    JWT_ACCOUNT_ACTIVATION=8743409876545GNVBMNBK
    EMAIL_TO=mailmeaktiwari@gmail.com
    EMAIL_FROM=noreply@amantiwari.me
    JWT_RESET_PASSWORD=556778089865GVBNKJHGVGHBJ



<b>4. run command</b>
<br />

     npm start

<b>5. Node server started listening to port 8000</b>
