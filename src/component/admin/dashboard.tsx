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
          <Card style={{ width: 300 }}>
            <h2>Total User</h2>
            <Divider />
            <h2 >
              <CountUp
                duration={2.75}
                end={dataDashboard.users.countUsers}
              ></CountUp>
            </h2>
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ width: 300 }}>
            <h2>Total Admin</h2>
            <Divider />
            <h2>
              <CountUp
                duration={2.75}
                end={dataDashboard.users.countAdmin}
              ></CountUp>
            </h2>
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card style={{ width: 300 }}>
            <h2>Total Quiz</h2>
            <Divider />
            <h2>
              <CountUp
                duration={2.75}
                end={dataDashboard.others.countQuiz}
              ></CountUp>
            </h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: 300 }}>
            <h2>Total Question</h2>
            <Divider />
            <h2>
              <CountUp
                duration={2.75}
                end={dataDashboard.others.countQuestions}
              ></CountUp>
            </h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: 300 }}>
            <h2>Total Answer</h2>
            <Divider />
            <h2>
              <CountUp
                duration={2.75}
                end={dataDashboard.others.countAnswers}
              ></CountUp>
            </h2>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
