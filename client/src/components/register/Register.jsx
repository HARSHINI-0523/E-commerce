import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //error state
  let [err, setErr] = useState("");
  //navigate to routes
  let navigate = useNavigate();

  //on user submit
  async function onUserRegister(newUser) {
    try {
      let res = await fetch("http://localhost:4000/user-api/user", {
        method: "POST",
        headers: { "Content-type": "application/json" ,},
        body: JSON.stringify(newUser),
      });
      let data=await res.json()
      
      if (data.message === 'user created') {
        //navigate to Login component
        navigate("/login");
      }
      else{
        setErr(data.message)
      }
    } catch (err) {
      console.log("err is ", err);
      setErr(err.message);
    }
  }

  return (
    <div>
      <p className="display-3 text-center">User registration</p>
      {/* registration form */}
      <div className="row ">
        <div className="col-11 col-sm-10 col-md-6 mx-auto">
          {/* other error message */}
          {err.length !== 0 && (
            <p className="fs-2 text-danger text-center">{err}</p>
          )}
          <form
            className="mx-auto mt-5 bg-light p-3"
            onSubmit={handleSubmit(onUserRegister)}
          >
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
              />
              {/* validation error message on username */}
              {errors.username?.type === "required" && (
                <p className="text-danger lead">*Username is required</p>
              )}
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
                {...register("password", { required: true })}
              />
              {/* validation error message on password */}
              {errors.password?.type === "required" && (
                <p className="text-danger lead">*Password is required</p>
              )}
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
                {...register("email", { required: true })}
              />
              {/* validation error message on email */}
              {errors.email?.type === "required" && (
                <p className="text-danger lead">*Email is required</p>
              )}
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
                {...register("mobile", { required: true })}
              />
              {/* validation error message on mobile */}
              {errors.mobile?.type === "required" && (
                <p className="text-danger lead">*Mobile no is required</p>
              )}
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
                {...register("profileImage", { required: true })}
              />
              {/* validation error message on profile image */}
              {errors.profileImage?.type === "required" && (
                <p className="text-danger lead">*Profile image is required</p>
              )}
            </div>
            {/* submit button */}
            <button className="btn btn-success" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
