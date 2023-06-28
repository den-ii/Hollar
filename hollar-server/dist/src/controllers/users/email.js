export const semail = (token) => `<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css"
    />
    <title>Verification Mail</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Raleway:wght@400;500;600;700&display=swap');

        .poppins{
            font-family: 'Poppins', sans-serif;
        }
      </style>
  </head>
  <body>
    <div class="w-[80%] max-w-[500px] max-h-[500px] mt-3 mx-auto shadow">
        <h1 class="font-bold text-xl text-purple-700 .poppins">HOLLAR&#8482;</h1>

        <div class="mt-3">
                <p class=".poppins">Please click on the verification button</p>
                <a href=${token} class="py-2 px-2 bg-purple-700 text-white">Verification</a>
        </div>

    </div>

  </body>
</html>`;
