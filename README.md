## Steps to run the project.

### To Run locally:
1. Clone the repository.
2. Run 'npm install' in the project root.
3. Add environment variables.
4. Run the command ``npm run dev`` to run the project.

### To deploy in vps:
Please refer this:\
https://nextjs.org/docs/app/api-reference/config/next-config-js/output

### pm2 start command:
PORT=portnumber pm2 start server.js --name "flag-frontend"

### Demo Video: 
https://drive.google.com/file/d/13Ymj7nVhyzY1eSA8dO2Agk7spmwko90m/view?usp=sharing

### Architechture:
There will be 3 roles in this multi tenant application.\
superadmin,
admin, 
user

* **superadmin** can only be logged in from https://root.narendrak.in/ and create, view organizations.
* **admin** can create, edit, delete feature flags for the organization he belongs to.
* **user** can check whether a feature flag is enabled or not.

## Test Credentials:

### Superadmin - https://root.narendrak.in/
**Email:** narendra.superadmin@gmail.com\
**Password:** 123456

### Organization 1 - https://coastal-aqua.narendrak.in/ 
**Admin User Credentials:**\
**Email**: narendra.coastalaqua.admin@gmail.com\
**Password**: 123456

**Regular User Credentials:**\
**Email:** narendra.coastalaqua.user@gmail.com\
**Password:** 123456

### Organization 2 - https://apex-elec.narendrak.in/
**Admin User Credentials:**\
**Email**: narendra.apexelec.admin@gmail.com\
**Password**: 123456

**Regular User Credentials:**\
**Email:** narendra.apexelec.user@gmail.com\
**Password:** 123456

### Organization 3 - https://urban-decor.narendrak.in/ 
**Admin User Credentials:**\
**Email**: narendra.urbandecor.admin@gmail.com\
**Password**: 123456

**Regular User Credentials:**\
**Email:**  narendra.urbandecor.user@gmail.com\
**Password:** 123456