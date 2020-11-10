export default (email, password) => ({
    from: `WeTube Cgroup <maridim.dev@gmail.com>`,
    to: email,
    subject: 'Registration new account',
    html: `
        <div>
            <h3>Welcome to WeTube</h3>
            <ul> 
                <li>
                    <span>E-Mail: </span>
                    <span>${email}</span>
                </li>
                <li>
                    <span>Password: </span>
                    <span>${password}</span>
                </li>
            </ul> 
        </div>
    `
})