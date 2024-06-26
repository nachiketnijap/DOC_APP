import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorsList from "../components/DoctorsList";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      res.status(500).send({});
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div>
      <Layout>
        <h1 className="text-center">Home</h1>
        <Row>
          {doctors && doctors.map((doctor) => <DoctorsList doctor={doctor} />)}
        </Row>
      </Layout>
    </div>
  );
};

export default Home;
