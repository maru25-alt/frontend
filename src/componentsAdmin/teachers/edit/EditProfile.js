import React, { useState, useEffect } from "react";
import PersonalInfo from "../../../shared/users/Personalnfo";
import EmplymentDetails from "../create/EmploymentDetails";
import ContactDetails from "../../../shared/users/Contact";
import ProfilePicture from "../../../shared/components/ProfilePicture";
import NextofKin from "../../../shared/components/NextofKin";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

function EditStaff() {
  const { id } = useParams();
  const [details, setdetails] = useState({});
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [secondName, setsecondName] = useState("");
  const [gender, setgender] = useState("");
  const [dateofBirth, setdateofBirth] = useState("");
  const [email, setemail] = useState("");
  const [nationality, setnationality] = useState("");
  const [placeofBirth, setplaceofBirth] = useState("");
  const [religion, setreligion] = useState("");
  const [title, settitle] = useState("");
  const [health, sethealth] = useState("");
  const [allege, setallege] = useState("");
  const [disease, setdisease] = useState("");
  const [loading, setloading] = useState("");
  const [classID, setclass] = useState("");
  const [courses, setcourses] = useState([]);

  const [profileUrl, setprofileUrl] = useState("");
  const [profileimg, setprofileimg] = useState("");

  //form verification
  const { register, handleSubmit, errors } = useForm();

  //EmplymentDetails
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [campus, setCampus] = useState("");
  const [employmentDate, setemploymentDate] = useState(null);
  const [accountNumber, setaccountNumber] = useState("");
  const [bank, setbank] = useState("");
  const [qualification, setqualification] = useState("");
  const [years, setyears] = useState("");

  //contact details
  const [mobilenumber, setmobilenumber] = useState("");
  const [residence, setresidence] = useState("");
  const [telephone, settelephone] = useState("");
  const [postalAddress, setpostalAddress] = useState("");

  //guidan

  const [nexttelephone, setnexttelephone] = useState("");
  const [nextname, setnextname] = useState("");
  const [nextlastname, setnextlastname] = useState("");
  const [nextemail, setnextemail] = useState("");
  const [relationship, setrelationship] = useState("");
  const [occupation, setoccupation] = useState("");
  const [address, setaddress] = useState("");

  useEffect(() => {
    axios.get(`/teachers/${id}`).then((res) => {
      let data = res.data.user;
      console.log(data);
      setdetails(data);
      setname(data?.name);
      setlastname(data?.surname);
      setgender(data?.gender);
      setsecondName(data?.middleName);
      setdateofBirth(data?.dateofBirth);
      setprofileimg(data?.profileUrl);
      setemail(data?.email);
      setnationality(data?.nationality);
      setplaceofBirth(data?.placeofBirth);
      setreligion(data?.religion);
      settitle(data?.title);
      sethealth(data?.health);
      setallege(data?.allege);
      setdisease(data?.disease);
      setclass(data?.classID);
      setcourses(data?.courses);
      setRole(data?.position);
      setDepartment(data?.department);
      setCampus(data?.campus);
      setemploymentDate(data?.employmentDate);
      setqualification(data?.qualification);
      setyears(data?.years);
      setbank(data?.bank);
      setaccountNumber(data?.accountNumber);
      setmobilenumber(data?.telephone);
      setresidence(data?.physicalAddress);
      settelephone(data?.mobile);
      setpostalAddress(data?.postalAddress);
      setnexttelephone(data?.nextofKin?.mobile);
      setnextemail(data?.nextofKin?.email);
      setnextlastname(data?.nextofKin?.lastname);
      setnextname(data?.nextofKin?.name);
      setaddress(data?.nextofKin?.address);
      setoccupation(data?.nextofKin?.occupation);
      setrelationship(data?.nextofKin?.relationship);
    });
  }, [id]);

  const handleReset = (data) => {
    setname(data?.name);
    setlastname(data?.surname);
    setgender(data?.gender);
    setsecondName(data?.middleName);
    setdateofBirth(data?.dateofBirth);
    setemail(data?.email);
    setnationality(data?.nationality);
    setplaceofBirth(data?.placeofBirth);
    setreligion(data?.religion);
    settitle(data?.title);
    setRole(data?.position);
    setDepartment(data?.department);
    setCampus(data?.campus);
    setemploymentDate(data?.employmentDate);
    setqualification(data?.qualification);
    setyears(data?.years);
    setaccountNumber(data?.accountNumber);
    setbank(data?.bank);
    setmobilenumber(data?.telephone);
    setresidence(data?.physicalAddress);
    settelephone(data?.mobile);
    setpostalAddress(data?.postalAddress);
    setnexttelephone(data?.nextofKin?.mobile);
    setnextemail(data.nextofKin?.email);
    setnextlastname(data.nextofKin?.name);
    setnextname(data.nextofKin?.name);
    setaddress(data.nextofKin?.address);
    setoccupation(data.nextofKin?.occupation);
    setrelationship(data.nextofKin?.relationship);
  };

  const handleCreateSubmit = async () => {
    console.log("clicked");
    setloading(true);
    const fileData = new FormData();
    fileData.append("photo", profileUrl);
    var path = {};
    if (profileUrl) {
      path = await axios.post("/upload", fileData, {});
    }

    axios
      .put(`/teachers/update/${id}`, {
        profileUrl: path,
        name,
        middleName: secondName,
        surname: lastname,
        gender,
        dateofBirth,
        title,
        email,
        nationality,
        religion,
        placeofBirth,
        health,
        disease,
        campus,
        allege,
        courses,
        classID,
        bank,
        accountNumber,
        years,
        employmentDate,
        position: role,
        mobile: mobilenumber,
        telephone,
        qualifications: qualification,
        postalAddress,
        physicalAddress: residence,
        nextofKin: {
          name: nextname,
          relationship: relationship,
          occupation: occupation,
          email: nextemail,
          mobile: nexttelephone,
          address: address,
          lastname: nextlastname,
        },
      })
      .then((res) => {
        console.log(res.data);
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setdetails(res.data.teacher);
        successAlert("Successfully Edited");
      })
      .catch((err) => {
        console.log(err);
        errorAlert("Something went wrong");
        setloading(false);
      });
  };

  const handleChangeFile = (e) => {
    const selected = e.target.files[0];
    if (selected?.size > 2000000) {
      errorAlert("image is too large");
    } else if (selected) {
      setprofileUrl(selected);
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selected);
      fileReader.onloadend = () => {
        setprofileimg(fileReader.result);
      };
    } else {
      console.log("no file selected");
    }
  };

  const handleCoursesCheckbox = (e) => {
    console.log(e.target.checked, e.target.value);
    if (e.target.checked) {
      setcourses([e.target.value, ...courses]);
    } else {
      setcourses(courses.filter((i) => i !== i.target.value));
    }
  };

  return (
    <div>
      <h2>Edit Teachers Details</h2>
      <div>
        <form action="" className="content__container">
          <ProfilePicture
            profileUrl={profileUrl}
            profileimg={profileimg}
            setprofileUrl={handleChangeFile}
          />
          <PersonalInfo
            register={register}
            title={title}
            setTitle={settitle}
            isTeacher={true}
            errors={errors}
            setHeathCon={sethealth}
            name={name}
            setname={setname}
            secondName={secondName}
            setsecondName={setsecondName}
            lastname={lastname}
            setlastname={setlastname}
            gender={gender}
            setgender={setgender}
            dateofBirth={dateofBirth}
            setdateofBirth={setdateofBirth}
            email={email}
            setemail={setemail}
            nationality={nationality}
            setnationality={setnationality}
            placeofBirth={placeofBirth}
            setplaceofBirth={setplaceofBirth}
            religion={religion}
            setreligion={setreligion}
          />
          <br className="my-4" />
          <EmplymentDetails
            register={register}
            errors={errors}
            role={role}
            bank={bank}
            setbank={setbank}
            accountNumber={accountNumber}
            setaccountNumber={setaccountNumber}
            setRole={setRole}
            classID={classID}
            setclass={setclass}
            department={department}
            setDepartment={setDepartment}
            campus={campus}
            handleCoursesCheckbox={handleCoursesCheckbox}
            setCampus={setCampus}
            employmentDate={employmentDate}
            setemploymentDate={setemploymentDate}
            qualification={qualification}
            setqualification={setqualification}
            years={years}
            setyears={setyears}
          />
          <br className="my-4" />
          <ContactDetails
            register={register}
            errors={errors}
            mobilenumber={mobilenumber}
            setmobilenumber={setmobilenumber}
            residence={residence}
            setresidence={setresidence}
            settelephone={settelephone}
            telephone={telephone}
            setpostalAddress={setpostalAddress}
            postalAddress={postalAddress}
          />
          <br className="my-4" />
          <NextofKin
            lastname={nextlastname}
            setlastname={setnextlastname}
            name={nextname}
            setname={setnextname}
            errors={errors}
            register={register}
            telephone={nexttelephone}
            settelephone={setnexttelephone}
            email={nextemail}
            setemail={setnextemail}
            setaddress={setaddress}
            address={address}
            occupation={occupation}
            setoccupation={setoccupation}
            relationship={relationship}
            setrelationship={setrelationship}
          />
          <br className="my-4" />

          <div className="row ">
            <button
              type="submit"
              onClick={handleSubmit(handleCreateSubmit)}
              className=" col btn orange__btn mr-5"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Loading...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleReset(details);
              }}
              className=" col btn blue__btn"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStaff;
