"use client";
import { Card, Divider, Row, Col } from "antd";
import CountUp from "react-countup";

const AdminDashboard = (props: any) => {
  const { dataDashboard } = props;
  console.log("check data dashboard: ", dataDashboard);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card style={{ width: 300 ,background:'#98DBE9' , fontSize:'20px'}}>
            <p>Total User</p>
            <Divider />
            <p >
              <CountUp
                duration={2.75}
                end={dataDashboard.users.countUsers}
              ></CountUp>
            </p>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ width: 300,background:"#FBBCC0", fontSize:'20px' }}>
            <p>Total Admin</p>
            <Divider />
            <p>
              <CountUp
                duration={2.75}
                end={dataDashboard.users.countAdmin}
              ></CountUp>
            </p>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card style={{ width: 300,background:'#B8AEFF', fontSize:'20px' }}>
            <p>Total Quiz</p>
            <Divider />
            <p>
              <CountUp
                duration={2.75}
                end={dataDashboard.others.countQuiz}
              ></CountUp>
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: 300,background:'#FBBCC0', fontSize:'20px' }}>
            <p>Total Question</p>
            <Divider />
            <p>
              <CountUp
                duration={2.75}
                end={dataDashboard.others.countQuestions}
              ></CountUp>
            </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: 300,background:'#B8FBC3', fontSize:'20px' }}>
            <p>Total Answer</p>
            <Divider />
            <p>
              <CountUp
                duration={2.75}
                end={dataDashboard.others.countAnswers}
              ></CountUp>
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
