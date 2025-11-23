import type { Meta, StoryObj } from '@storybook/react';
import CylinderPosters from '@/components/CylinderPosters';

const meta: Meta<typeof CylinderPosters> = {
  title: 'Projects/CylinderPosters',
  component: CylinderPosters,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A seamless cylindrical band of poster panels with edge-to-edge alignment. Desktop uses CSS3D transforms; mobile uses a responsive carousel fallback.',
      },
    },
  },
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of poster images with id, src, alt, and optional link',
    },
    numPanels: {
      control: { type: 'number', min: 3, max: 36, step: 1 },
      description: 'Number of panels in the cylinder (default: 20)',
    },
    panelWidthPx: {
      control: { type: 'number', min: 200, max: 500, step: 10 },
      description: 'Panel width in pixels (default: 320)',
    },
    panelRatio: {
      control: { type: 'number', min: 0.5, max: 1.0, step: 0.01 },
      description: 'Panel height ratio for 4:3 aspect (default: 0.75)',
    },
    autoRotateDegPerSec: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'Auto-rotation speed in degrees per second (default: 8)',
    },
    spacingFactor: {
      control: { type: 'number', min: 0.98, max: 1.02, step: 0.001 },
      description: 'Spacing multiplier for seam removal (default: 0.995)',
    },
    maxBendDeg: {
      control: { type: 'number', min: 0, max: 15, step: 0.5 },
      description: 'Maximum visual bend per panel in degrees (default: 6)',
    },
    initialRotationDeg: {
      control: { type: 'number', min: -360, max: 360, step: 5 },
      description: 'Initial rotation angle in degrees (default: 0)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CylinderPosters>;

const defaultImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    alt: 'Modern architecture project',
    link: '/projects/project-1',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    alt: 'Interior design project',
    link: '/projects/project-2',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    alt: 'Urban planning project',
    link: '/projects/project-3',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
    alt: 'Landscape architecture project',
    link: '/projects/project-4',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    alt: 'Commercial building project',
    link: '/projects/project-5',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    alt: 'Residential complex project',
    link: '/projects/project-6',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    alt: 'Sustainable design project',
    link: '/projects/project-7',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    alt: 'Cultural center project',
    link: '/projects/project-8',
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
    alt: 'Mixed-use development project',
    link: '/projects/project-9',
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8d86256?w=800&h=600&fit=crop',
    alt: 'Hospitality design project',
    link: '/projects/project-10',
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    alt: 'Educational facility project',
    link: '/projects/project-11',
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    alt: 'Retail space project',
    link: '/projects/project-12',
  },
];

export const Default: Story = {
  args: {
    images: defaultImages,
    numPanels: 20,
    panelWidthPx: 320,
    panelRatio: 0.75,
    autoRotateDegPerSec: 8,
    spacingFactor: 0.995,
    maxBendDeg: 6,
    initialRotationDeg: 0,
  },
};

export const FastRotation: Story = {
  args: {
    ...Default.args,
    autoRotateDegPerSec: 12,
  },
};

export const SlowRotation: Story = {
  args: {
    ...Default.args,
    autoRotateDegPerSec: 4,
  },
};

export const LargePanels: Story = {
  args: {
    ...Default.args,
    panelWidthPx: 400,
    panelRatio: 0.75,
  },
};

export const SmallPanels: Story = {
  args: {
    ...Default.args,
    panelWidthPx: 280,
    panelRatio: 0.75,
  },
};

export const MoreBend: Story = {
  args: {
    ...Default.args,
    maxBendDeg: 10,
  },
};

export const LessBend: Story = {
  args: {
    ...Default.args,
    maxBendDeg: 3,
  },
};

export const TighterSpacing: Story = {
  args: {
    ...Default.args,
    spacingFactor: 0.99,
  },
};

export const LooserSpacing: Story = {
  args: {
    ...Default.args,
    spacingFactor: 0.998,
  },
};

export const FewPanels: Story = {
  args: {
    ...Default.args,
    numPanels: 12,
  },
};

export const ManyPanels: Story = {
  args: {
    ...Default.args,
    numPanels: 30,
  },
};





