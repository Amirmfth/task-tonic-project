import moment from "moment/moment";

function ProfileData({ user }) {
  const { name, lastName, email, createdAt } = user;

  return (
    <div className="profile-data">
      <div>
        <span>Name: </span>
        <p>{name}</p>
      </div>
      <div>
        <span>Last Name: </span>
        <p>{lastName}</p>
      </div>
      <div>
        <span>Email: </span>
        <p>{email}</p>
      </div>
      <div>
        <span>Created At: </span>
        <p>{moment(createdAt).format("YYYY-MM-DD")}</p>
      </div>
    </div>
  );
}

export default ProfileData;
