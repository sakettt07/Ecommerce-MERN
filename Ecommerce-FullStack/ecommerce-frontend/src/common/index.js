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
}
export default AllApi