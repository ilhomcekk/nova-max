import React from "react";
import MessageTab1 from "./MessageTab1";
import MessageTab2 from "./MessageTab2";
import MessageTab3 from "./MessageTab3";
import MessageDetail from "./MessageDetail";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MContainer } from "../../element/Elemens";
import Title from "../../component/Title/Title";
import SecondNavbar from "../../component/layout/SecondNavbar";
import "../../assets/scss/_message.scss";

export default function Message() {
  return (
    <div style={{ minHeight: '80vh' }}>
      <SecondNavbar />
      <MContainer>
        <Title name="Мои сообщение" />
        <div className="my__message">
          <Tabs>
            <TabList>
              {/* <Tab>По пользователям</Tab> */}
              <Tab>По магазинам</Tab>
              <Tab>По администраторам</Tab>
            </TabList>
            {/* <TabPanel>
            <MessageTab1 />
          </TabPanel> */}
            <TabPanel>
              <MessageTab2 />
            </TabPanel>
            <TabPanel>
              <MessageTab3 />
            </TabPanel>
            {/* <TabPanel>
					<MessageTab4 />
				</TabPanel> */}
          </Tabs>
        </div>
      </MContainer>
    </div>
  );
}
