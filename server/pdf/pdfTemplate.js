module.exports = ({ email, room, workType, status, details, sourceOfFund }) => {
  return `
        <!doctype html>
        <html>
           <head>
              <meta charset="utf-8">
              <title>PDF Result Template</title>
              <style>
              * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
            }
            #customers td, #customers th{
              border:1px solid #ddd;
              padding:8px;
            }
            #customers tr:nth-child(even){
              background-color:#f2f2f2;
            }
            #customers tr:hover{
              background-color:#ddd;
            }
            #customers th{
              padding-top:12px;
              padding-bottom:12px;
              text-align:left;
              background-color:#04AA6D;
              color:white;
            }
            #customers{
              font-family:Arial, Helvetica, sans-serif;
              border-collapse:collapse;
              width:100%;
            }
            #i0zk{
              text-align:center;
            }
            *{
              box-sizing:border-box;
            }
            table{
              border-collapse:collapse;
              border-spacing:0;
              width:100%;
              border:1px solid #ddd;
            }
            th, td{
              text-align:left;
              padding:16px;
            }
            tr:nth-child(even){
              background-color:#f2f2f2;
            }
            
              </style>
           </head>
           <body>
           <div id="imd6">
           <h1 id="i0zk"> Requset Details 
           </h1>
           <table id="customers">
             <tbody>
               <tr>
                 <td>Request By :
                 </td>
                 <td> ${email}
                 </td>
               </tr>
               <tr>
                 <td>Room(s)
                 </td>
                 <td> ${room}
                 </td>
               </tr>
               <tr>
                 <td>Nature of Work:
                 </td>
                 <td>${workType}
                 </td>
               </tr>
               <tr>
                 <td>Description:
                 </td>
                 <td>${details}</td>
               </tr>
               <tr>
                 <td>Source of fund:
                 </td>
                 <td>${sourceOfFund}
                 </td>
               </tr>
               <tr>
                 <td>Request Status:
                 </td>
                 <td>${status}
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
         <div id="ifw5i">
         </div>
           </body>
        </html>
        `;
};
