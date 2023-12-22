'use client';

import DashboardList from '../_component/DashboardList';

const mockDashboard = {
  cursorId: 0,
  totalCount: 2,
  dashboards: [
    {
      id: 1,
      title: '비브리지',
      color: 'string',
      createdAt: '2023-12-21T09:32:04.296Z',
      updatedAt: '2023-12-21T09:32:04.296Z',
      createdByMe: true,
      userId: 0,
    },
    {
      id: 2,
      title: '코드잇',
      color: 'string',
      createdAt: '2023-12-21T09:32:04.296Z',
      updatedAt: '2023-12-21T09:32:04.296Z',
      createdByMe: true,
      userId: 0,
    },
    {
      id: 3,
      title: '3분기 계획',
      color: 'string',
      createdAt: '2023-12-21T09:32:04.296Z',
      updatedAt: '2023-12-21T09:32:04.296Z',
      createdByMe: true,
      userId: 0,
    },
    {
      id: 4,
      title: '회의록',
      color: 'string',
      createdAt: '2023-12-21T09:32:04.296Z',
      updatedAt: '2023-12-21T09:32:04.296Z',
      createdByMe: true,
      userId: 0,
    },
    {
      id: 5,
      title: '중요문서함',
      color: 'string',
      createdAt: '2023-12-21T09:32:04.296Z',
      updatedAt: '2023-12-21T09:32:04.296Z',
      createdByMe: true,
      userId: 0,
    },
    {
      id: 6,
      title: '안중요문서함',
      color: 'string',
      createdAt: '2023-12-21T09:32:04.296Z',
      updatedAt: '2023-12-21T09:32:04.296Z',
      createdByMe: true,
      userId: 0,
    },
    {
      id: 7,
      title: '크리스마스 캐롤 모음',
      color: 'string',
      createdAt: '2023-12-21T09:32:04.296Z',
      updatedAt: '2023-12-21T09:32:04.296Z',
      createdByMe: true,
      userId: 0,
    },
  ],
};

export default function MyBoard() {
  return <DashboardList dashBoards={mockDashboard.dashboards} totalPages={mockDashboard.totalCount} />;
}
