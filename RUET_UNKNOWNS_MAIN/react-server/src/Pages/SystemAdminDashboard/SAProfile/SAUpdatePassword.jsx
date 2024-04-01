import { useState } from "react";

const SAUpdatePassword = () => {
  const [newPass, setNewPass] = useState("");
  const [checkNewPass, setCheckNewPass] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showCheckNewPass, setShowCheckNewPass] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handlePasswordChangeBtn = () => {
    fetch(`${backendUrl}/auth/change-password/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: "Token " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        new_password1: newPass,
        new_password2: checkNewPass,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          alert("Password changed successfully");
        } else {
          alert("Password change unsuccessful");
        }
      })
      .then();
  };

  return (
    <div className="bg-white p-5 sm:p-10 drop-shadow-md rounded-md">
      <div className="">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Update Password</h1>
        </div>
        <div className="w-fit mx-auto mt-10">
          <div className="my-3">
            <label htmlFor="new_password1" className="block font-semibold">
              New Password
            </label>
            <input
              type={showNewPass ? "text" : "password"}
              id="new_password1"
              name="new_password1"
              className="input input-success"
              onChange={(e) => setNewPass(e.target.value)}
            />
            <div className="mt-1">
              <input
                type="checkbox"
                id="showNewPassCheckbox"
                onChange={() => {
                  setShowNewPass(!showNewPass);
                }}
              />{" "}
              <label htmlFor="showNewPassCheckbox">Show password</label>
            </div>
          </div>
          <div>
            <label htmlFor="new_password2" className="block font-semibold">
              Rewrite New Password
            </label>
            <input
              type={showCheckNewPass ? "text" : "password"}
              id="new_password2"
              name="new_password2"
              className="input input-success"
              onChange={(e) => setCheckNewPass(e.target.value)}
            />
            <div className="mt-1">
              <input
                type="checkbox"
                id="showCheckNewPassCheckbox"
                onChange={() => {
                  setShowCheckNewPass(!showCheckNewPass);
                }}
              />{" "}
              <label htmlFor="showCheckNewPassCheckbox">Show password</label>
            </div>
          </div>
          {newPass && checkNewPass && newPass != checkNewPass && (
            <div className="text-red-600">Password does not match</div>
          )}
          <div className="w-fit mx-auto mt-5">
            <button
              onClick={() => handlePasswordChangeBtn()}
              className="btn btn-success px-8 min-h-0 h-10"
              disabled={newPass != checkNewPass}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SAUpdatePassword;
