export default (email, token) => ({
    from: `WeTube Cgroup <maridim.dev@gmail.com>`,
    to: email,
    subject: 'Reset password!',
    html: `
        <div>
            <h3>To reset password fallow the link: </h3>
            <a href='http://127.0.0.1:3000/password?token=${token}'>Click me!<a/>          
        </div>
    `
})