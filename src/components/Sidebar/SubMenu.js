import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { DynamicIcon } from '../DynamicIcon';
import { RiArrowUpSFill, RiArrowDownSFill } from 'react-icons/ri';
import styled from 'styled-components';

const SidebarLink = styled.div`
  align-items: center;
  color: #e1e9fc;
  display: flex;
  font-size: 1rem;
  height: 50px;
  justify-content: space-between;
  list-style: none;
  padding: 17.5px;
  text-decoration: none;

  &:hover {
    background-color: #0353a4;
    border-left: 8px solid #001233;
    cursor: pointer;
  }
`;

const DropdownLink = styled.div`
  align-items: center;
  background-color: #023e7d;
  border-radius: 4px;
  color: #f5f5f5;
  display: flex;
  font-size: 14px;
  height: 30px;
  margin: 0 auto;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  padding-left: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  text-decoration: none;
  width: 75%;

  &:hover {
    background-color: #002855;
    cursor: pointer;
    width: 75%;
  }
`;

const SidebarSpan = styled.span`
  margin-left: 16px;
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const history = useHistory();

  return (
    <>
      <SidebarLink to='#' onClick={item.topics && showSubnav}>
        <div>
          <DynamicIcon name={item.icon.name} set={item.icon.set} />
          <SidebarSpan>{item.title}</SidebarSpan>
        </div>
        <div>
          {item.topics && subnav ? (
            <RiArrowUpSFill />
          ) : item.topics ? (
            <RiArrowDownSFill />
          ) : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.topics.map((listItem, index) => {
          const icon = JSON.parse(listItem.icon);
          const list = item;
          const path =
            listItem.title === 'Introducción'
              ? '/intro'
              : `/${list.title}/${listItem.title}`;

          return (
            <DropdownLink key={index} onClick={() => {
                history.push(path);
              }}
            >
              <DynamicIcon name={icon.name} set={icon.set} />
              <SidebarSpan>{listItem.title}</SidebarSpan>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
