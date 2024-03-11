"use client";
import { Card, Divider, Row, Col } from "antd";
import CountUp from "react-countup";
import { PieChart } from '@mui/x-charts/PieChart';

const AdminDashboard = (props: any) => {
  const { dataDashboard } = props;

  return (
    <div>

      <Row gutter={[16, 16]}>
        <Col span={{ xs: 24, md: 12, lg: 12 }}>
          <Card style={{ width: 300, background: '#98DBE9', fontSize: '20px' }}>
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
        <Col span={{ xs: 24, md: 12, lg: 12 }}>
          <Card style={{ width: 300, background: "#FBBCC0", fontSize: '20px' }}>
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
        <Col span={{ xs: 24, md: 8 }}>
          <Card style={{ width: 300, background: '#B8AEFF', fontSize: '20px' }}>
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
        <Col span={{ xs: 24, md: 8 }}>
          <Card style={{ width: 300, background: '#FBBCC0', fontSize: '20px' }}>
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
        <Col span={{ xs: 24, md: 8 }}>
          <Card style={{ width: 300, background: '#B8FBC3', fontSize: '20px' }}>
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

      {/* <PieChart
        series={[
          {
            data: [
              { id: 0, value: dataDashboard.others.countAnswers, label: 'Total Answers' },
              { id: 1, value: dataDashboard.others.countQuestions, label: 'Total Questions' },
              { id: 2, value: dataDashboard.others.countQuiz, label: 'Total Quizzes' },
              { id: 3, value: dataDashboard.users.countAdmin, label: 'Total Admins' },
              { id: 4, value: dataDashboard.users.countUsers, label: 'Total Users' },
            ],
          },
        ]}
        width={500}
        height={500}
      /> */}
      
    </div>
  );
};

export default AdminDashboard;
