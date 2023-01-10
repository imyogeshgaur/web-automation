export const resetPasswordFirstName = (userId,firstName) => {
    return `
<html>
<head>
</head>
<body>
    Dear ${firstName} we recieved a password Reset Request From you.<br>
    The Password Reset Link is : <br>
    http://localhost:5173/resetPassword/${userId}<br>
    Thanks and Regards
    <br>
    Team Meri Dukaan
</body>
</html>
`
}

export const resetPasswordUserName = (userId,userName) => {
    return `
<html>
<head>
</head>
<body>
    Dear ${userName} we recieved a password Reset Request From you.<br>
    The Password Reset Link is : <br>
    http://localhost:5173/resetPassword/${userId}<br>
    Thanks and Regards
    <br>
    Team Meri Dukaan
</body>
`
}