import React, { useState } from 'react';
import { Button, Card, List, Space, Typography, Image, Row, Col } from 'antd';
import { SwapOutlined, ReloadOutlined, ClearOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Person {
  id: string;
  name: string;
  assignedTo?: string;
  logoUrl?: string;
  assignedTeams?: Person[];
}

const BlindDraw: React.FC = () => {
  // Initial data - you can replace these with actual names
  const [leftSide, setLeftSide] = useState<Person[]>([
    { id: '1', name: 'Greenwell' },
    { id: '2', name: 'Jordan' },
    { id: '3', name: 'Jon D' },
    { id: '4', name: 'Stanton' },
    { id: '5', name: 'Brett' },
    { id: '6', name: 'Jake' },
    { id: '7', name: 'Jim' },
    { id: '8', name: 'Ram' },

    //   { id: '1', name: 'Player 1' },
    // { id: '2', name: 'Player 2' },
    // { id: '3', name: 'Player 3' },
    // { id: '4', name: 'Player 4' },
    // { id: '5', name: 'Player 5' },
    // { id: '6', name: 'Player 6' },
    // { id: '7', name: 'Player 7' },
    // { id: '8', name: 'Player 8' },

  ]);

  const [rightSide, setRightSide] = useState<Person[]>([
    { id: '9', name: 'Michigan', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/6g03nk1666300641.png' },
    { id: '10', name: 'Auburn', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/ayj31e1564339884.png' },
    { id: '11', name: 'Ole Miss', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/pnc9tj1567268928.png' },
    { id: '12', name: 'Michigan State', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/ueidup1720216521.png' },
    { id: '13', name: 'Arkansas', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/da35ut1564269433.png' },
    { id: '14', name: 'Texas Tech', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/pebckl1604171614.png' },
    { id: '15', name: 'Maryland', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/sa3k991604169232.png' },
    { id: '16', name: 'Florida', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/xujitb1604168125.png' },
    { id: '17', name: 'Arizona', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/2gcnhq1564263850.png' },
    { id: '18', name: 'Duke', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/7h8kj31604168058.png' },
    { id: '19', name: 'BYU', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/8yutv41590485413.png' },
    { id: '20', name: 'Alabama', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/4mm5ez1564263262.png' },
    { id: '21', name: 'Kentucky', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/l6qj701604168837.png' },
    { id: '22', name: 'Tennassee', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/we05fb1586542970.png' },
    { id: '23', name: 'Purdue', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/ci9svd1604170965.png' },
    { id: '24', name: 'Houston', logoUrl: 'https://r2.thesportsdb.com/images/media/team/logo/qpo3vc1590491788.png' },
  ]);

  const assignRandomly = () => {
    // Create a copy of right side people
    const availableRight = [...rightSide];
    const newLeftSide = [...leftSide];
    const newRightSide = [...rightSide];

    // Reset assignments
    newLeftSide.forEach(person => {
      person.assignedTo = undefined;
      person.assignedTeams = undefined;
    });

    // Function to assign a single team to a person
    const assignTeamToPerson = (personIndex: number, teamIndex: number) => {
      if (availableRight.length === 0) return;

      const person = newLeftSide[personIndex];
      const randomIndex = Math.floor(Math.random() * availableRight.length);
      const assignedPerson = availableRight.splice(randomIndex, 1)[0];
      
      // Initialize assignedTeams array if it doesn't exist
      if (!person.assignedTeams) {
        person.assignedTeams = [];
      }
      
      // Update assignments
      person.assignedTeams.push(assignedPerson);
      person.assignedTo = person.assignedTeams.map(t => t.name).join(', ');
      assignedPerson.assignedTo = person.id;

      // Update state
      setLeftSide([...newLeftSide]);
      setRightSide([...newRightSide]);

      // Calculate next person and team indices
      const nextPersonIndex = (personIndex + 1) % newLeftSide.length;
      const nextTeamIndex = teamIndex + 1;

      // Schedule next assignment after 2 seconds
      setTimeout(() => {
        assignTeamToPerson(nextPersonIndex, nextTeamIndex);
      }, 1000);
    };

    // Start the sequential assignment process
    assignTeamToPerson(0, 0);
  };

  const shuffleTeams = () => {
    const shuffledTeams = [...rightSide]
      .sort(() => Math.random() - 0.5)
      .map((team, index) => ({
        ...team,
        id: (index + 9).toString() // Keep IDs sequential
      }));
    setRightSide(shuffledTeams);
  };

  const clearAssignments = () => {
    const newLeftSide = leftSide.map(person => ({
      ...person,
      assignedTo: undefined,
      assignedTeams: undefined
    }));
    const newRightSide = rightSide.map(person => ({
      ...person,
      assignedTo: undefined
    }));
    setLeftSide(newLeftSide);
    setRightSide(newRightSide);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button 
            type="primary" 
            icon={<SwapOutlined />} 
            onClick={assignRandomly}
            size="large"
          >
            Assign Randomly
          </Button>
          <Button 
            type="default" 
            icon={<ReloadOutlined />} 
            onClick={shuffleTeams}
            size="large"
          >
            Shuffle Teams
          </Button>
          <Button 
            type="default" 
            danger
            icon={<ClearOutlined />} 
            onClick={clearAssignments}
            size="large"
          >
            Clear Assignments
          </Button>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          {/* Left Side */}
          <Card title="Dudes" style={{ flex: 1 }}>
            <List
              dataSource={leftSide}
              renderItem={person => (
                <List.Item>
                  <Space direction="vertical" size="small">
                    <Typography.Text strong>{person.name}</Typography.Text>
                    {person.assignedTeams && (
                      <Space>
                        {person.assignedTeams.map(team => (
                          <Image
                            key={team.id}
                            src={team.logoUrl}
                            alt={`${team.name} logo`}
                            width={60}
                            height={60}
                            style={{ objectFit: 'contain' }}
                          />
                        ))}
                      </Space>
                    )}
                  </Space>
                </List.Item>
              )}
            />
          </Card>

          {/* Right Side */}
          <Card title="Sweet 16 Teams" style={{ flex: 2 }}>
            <Row gutter={[16, 16]}>
              {rightSide.map((person, index) => (
                <Col span={12} key={person.id}>
                  <List.Item>
                    <Space>
                      {person.logoUrl && (
                        <Image
                          src={person.logoUrl}
                          alt={`${person.name} logo`}
                          width={60}
                          height={60}
                          style={{ objectFit: 'contain' }}
                        />
                      )}
                      <Space direction="vertical">
                        <Typography.Text strong>{person.name}</Typography.Text>
                        {person.assignedTo && (
                          <Typography.Text type="secondary">
                            Assigned to: {leftSide.find(p => p.id === person.assignedTo)?.name}
                          </Typography.Text>
                        )}
                      </Space>
                    </Space>
                  </List.Item>
                </Col>
              ))}
            </Row>
          </Card>
        </div>
      </Space>
    </div>
  );
};

export default BlindDraw; 