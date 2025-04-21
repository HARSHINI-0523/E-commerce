import "./EditUser.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { userLoginContext } from "../../contexts/userLoginContext";
import { useNavigate } from "react-router-dom";

function EditUser() {
  let { register, handleSubmit, setValue } = useForm();
  let { currentUser ,setCurrentUser} = useContext(userLoginContext);
  let navigate=useNavigate()
  //save modified user after edit
    async function onSave(modifiedUser){
        console.log(modifiedUser)
        let res = await fetch('http://localhost:4000/user-api/user', {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(modifiedUser),
          });
          let data=await res.json()
          console.log("data :",data)
          if(data.message==='User modified'){
            modifiedUser.id=currentUser.id;
            setCurrentUser(modifiedUser)

            navigate("/user-profile")
          }
    }

  return (
    <div>
      <form className="mx-auto mt-5 bg-light p-3 w-50 " onSubmit={handleSubmit(onSave)}>
        {/* username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register("username", { required: true })}
            value={setValue("username", currentUser.username)}
            disabled
          />
        </div>
        {/* password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password")}
            value={setValue("password", currentUser.password)}
            disabled
          />
        </div>
        {/* email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email")}
            value={setValue("email", currentUser.email)}
          />
        </div>
        {/* mobileno */}
        <div className="mb-3">
          <label htmlFor="mobile" className="form-label">
            Mobile no
          </label>
          <input
            type="number"
            id="mobile"
            className="form-control"
            {...register("mobile")}
            value={setValue("mobile", currentUser.mobile)}
          />
        </div>
        {/* profile img */}
        <div className="mb-3">
          <label htmlFor="profile" className="form-label">
            Paste profile Image URL
          </label>
          <input
            type="text"
            id="profile"
            className="form-control"
            {...register("profileImage")}
            value={setValue("profileImage", currentUser.profileImage)}
            disabled
          />
        </div>
        {/* submit button */}
        <button className="btn btn-success" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditUser;
