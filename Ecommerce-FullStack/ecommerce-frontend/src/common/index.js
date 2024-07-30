const backendUrl="http://localhost:8000"

const AllApi={
    signUp:{
        url:`${backendUrl}/api/v1/users/register`,
        method:"post"
    },
    login:{
        url:`${backendUrl}/api/v1/users/login`,
        method:"post"
    },
    current_user:{
        url:`${backendUrl}/api/v1/users/user-details`,
        method:"get"
    },
    logout:{
        url:`${backendUrl}/api/v1/users/logout`,
        method:"get"
    },
    admin:{
        url:`${backendUrl}/api/v1/users/logout`,
        method:"get"
    },
}
export default AllApi