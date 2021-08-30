import React, { useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { useForm } from "react-hook-form";
import NavBar from "../Home/NavBar/NavBar";
import "./Login.css";
const app = initializeApp(firebaseConfig);
console.log(app);

const Login = () => {
  document.title = "Login Page";

  // google Auth....
  const provider = new GoogleAuthProvider();
  const GoogleClick = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        localStorage.setItem("token", token);
        const user = result.user;
        UpdateProfiles(user.displayName, user.photoURL);
        console.log(token, user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage, credential);
      });
  };

  //   Manual Auth.....
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loginLink, setLoginLink] = useState(false);
  const password = useRef({});
  password.current = watch("newPassword", "");
  const onSubmit = (data) => {
    if (data.newEmail && data.Password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, data.newEmail, data.Password)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("token", user.accessToken);
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
    } else if (
      data.Surname &&
      data.email &&
      data.confirmPassword &&
      data.confirmPassword
    ) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, data.email, data.confirmPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("token", user.accessToken);
          UpdateProfiles(data.Surname, user.photoURL);
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode);
        });
    }
  };
  // update Profile.....
  const UpdateProfiles = (name, photo) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo || "https://i.ibb.co/5GzXkwq/user.png",
    })
      .then(() => {})
      .catch((error) => {});
  };

  // handel Out
  const handelSingOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("token");
        console.log("rubel");
      })
      .catch((error) => {
        console.log("ahmed");
      });
  };

  return (
    <div>
      <NavBar></NavBar>
      <div className="login">
        <div className="container">
          <div className="containers">
            <div className="row">
              <div className="col-12">
                <div className=" p-3 BoxName">
                  {loginLink ? (
                    <div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="mb-3">
                          <label
                            for="exampleFormControl"
                            className="form-label"
                          >
                            <strong>Email :</strong>
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleFormControl"
                            {...register("newEmail", {
                              required: true,
                              pattern:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            })}
                          />
                          {errors.newEmail && (
                            <span className="text-danger">
                              Enter the correct Email
                            </span>
                          )}
                        </div>
                        <div class="mb-3">
                          <label for="example" className="form-label">
                            <strong>Password :</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="example"
                            {...register("Password", {
                              required: true,
                              pattern:
                                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/,
                            })}
                          />
                          {errors.Password && (
                            <p>
                              <span className="text-danger">
                                Enter the correct Password
                              </span>
                            </p>
                          )}
                        </div>
                        <input
                          className="form-control w-50 Sing-Up center-block  mb-3"
                          type="submit"
                          value="Login"
                        />
                      </form>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          <strong>Full Name :</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          {...register("Surname", { required: true })}
                        />
                        {errors.Surname && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          <strong>Email :</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput1"
                          {...register("email", {
                            required: true,
                            pattern:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          })}
                        />
                        {errors.email && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          <strong>Password :</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          {...register("newPassword", {
                            required: true,
                            pattern:
                              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/,
                          })}
                        />
                        {errors.newPassword && (
                          <p>
                            <span className="text-danger">
                              Password must have at least 8 characters or
                              <strong> A-Z </strong>
                              letter must be <strong>Any Number</strong> and
                              must be any
                              <strong>@,#,$,%,^,&,*,!</strong>
                            </span>
                          </p>
                        )}
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          <strong>Confirm Password :</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          {...register("confirmPassword", {
                            required: true,
                            validate: (v) => v === password.current,
                          })}
                        />
                        {errors.confirmPassword && (
                          <p>
                            <span className="text-danger">
                              The passwords do not match
                            </span>
                          </p>
                        )}
                      </div>
                      <input
                        className="form-control w-50 Sing-Up center-block mb-3"
                        type="submit"
                        value="Sing Up"
                      />
                    </form>
                  )}
                  <p className="Loging-one">
                    {loginLink ? (
                      <span>If you do not have an account , </span>
                    ) : (
                      <span>If you have an account , </span>
                    )}
                    <span onClick={() => setLoginLink(!loginLink)}>
                      <strong className="Loging">
                        {loginLink ? <span>Sing up</span> : <span>Login </span>}
                      </strong>
                    </span>
                  </p>
                  <hr></hr>

                  <div className="text-center ps-5 pe-5">
                    <h4 className="p-1 Sing" onClick={GoogleClick}>
                      Google Sing-up
                    </h4>
                    <h4 className="p-1 Sing" onClick={handelSingOut}>
                      Google hendelSingOut
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
