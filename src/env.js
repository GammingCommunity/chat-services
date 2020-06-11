require('dotenv').config();
module.exports = {
    mainServiceURL: `${process.env.main_service_url}`,
    subServiceURL: `${process.env.sub_service_url}`
}