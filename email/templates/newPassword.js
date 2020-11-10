export default (email, password) => ({
    from: `WeTube Cgroup <maridim.dev@gmail.com>`,
    to: email,
    subject: 'Change password',
    html: `
        <div>
            <h3>Welcome to WeTube</h3>
            <ul>
                <li>
                    <span>New password: </span>
                    <span>${password}</span>
                </li>
            </ul> 
        </div>
    `
})