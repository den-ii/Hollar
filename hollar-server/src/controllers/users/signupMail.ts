export const signupMail = (url) => `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Quicksand:wght@700&family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">

    <title>Verification Mail</title>
    <style>
      .main{
        height: 80%;
        max-height: 400px;
        width: 80%;
        max-width: 600px;
        margin: 2rem auto; 
        border: 1px solid #581eeb
        padding: 2rem;
        border-radius: 6px;
      }
      .logo{
        font-family: Arial , "Trebuchet Ms";
        font-weight: 700;
        font-size: 2rem;
        color: #581eeb;
        margin-top: 1rem;

      }
      .content{
        font-family: Arial,"Trebuchet Ms";
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .p{
        text-align: center;
        font-weight: 600;
      }
      .btn{
        padding: 0.6rem 1rem;
          background: #581eeb;
          font-family: "Trebuchet MS";
          text-decoration: none;
          color: #fff;
          border-radius: 6px;
          margin: 1rem auto;
          font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <h1 class='logo'>HOLLAR &#8482;</h1>

      <div class='content'>
        <p class="p">
          Please click on the verification button </p>
          <a href=${url} class='btn'>
            Verification
          </a>
        </p>
      </div>
    </div>
  </body>
</html>
 ` 
