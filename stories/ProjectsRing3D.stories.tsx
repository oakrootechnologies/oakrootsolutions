import type { Meta, StoryObj } from '@storybook/react';
import ProjectsRing3D from '@/components/ProjectsRing3D';

const meta: Meta<typeof ProjectsRing3D> = {
  title: 'Projects/Ring3D',
  component: ProjectsRing3D,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A 3D revolving carousel component for showcasing project images, inspired by clouarchitects.com. Features a full 3D ring on desktop and a touch-friendly horizontal carousel on mobile.',
      },
    },
  },
  argTypes: {
    images: {
      control: 'object',
      description: 'Array of project images with id, src, alt, link, and title',
    },
    panelWidth: {
      control: { type: 'number', min: 200, max: 500, step: 10 },
      description: 'Panel width in pixels (default: 300)',
    },
    panelRatio: {
      control: { type: 'number', min: 0.5, max: 1.0, step: 0.01 },
      description: 'Panel height ratio (height = width * ratio, default: 0.72)',
    },
    autoRotateDegPerSec: {
      control: { type: 'number', min: 0, max: 20, step: 1 },
      description: 'Auto-rotation speed in degrees per second (default: 8)',
    },
    initialRotationDeg: {
      control: { type: 'number', min: -360, max: 360, step: 5 },
      description: 'Initial rotation angle in degrees (default: 0)',
    },
    spacingFactor: {
      control: { type: 'number', min: 1.0, max: 1.2, step: 0.01 },
      description: 'Spacing multiplier for ring radius (default: 1.05)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProjectsRing3D>;

const defaultImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
    alt: 'Modern architecture project',
    link: '/projects/project-1',
    title: 'Modern Architecture',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    alt: 'Interior design project',
    link: '/projects/project-2',
    title: 'Interior Design',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    alt: 'Urban planning project',
    link: '/projects/project-3',
    title: 'Urban Planning',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop',
    alt: 'Landscape architecture project',
    link: '/projects/project-4',
    title: 'Landscape Architecture',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    alt: 'Commercial building project',
    link: '/projects/project-5',
    title: 'Commercial Building',
  },
  {
    id: '6',
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
    alt: 'Residential complex project',
    link: '/projects/project-6',
    title: 'Residential Complex',
  },
  {
    id: '7',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
    alt: 'Sustainable design project',
    link: '/projects/project-7',
    title: 'Sustainable Design',
  },
  {
    id: '8',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    alt: 'Cultural center project',
    link: '/projects/project-8',
    title: 'Cultural Center',
  },
  {
    id: '9',
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop',
    alt: 'Mixed-use development project',
    link: '/projects/project-9',
    title: 'Mixed-Use Development',
  },
  {
    id: '10',
    src: 'https://images.unsplash.com/photo-1487958449943-2429e8d86256?w=800&h=600&fit=crop',
    alt: 'Hospitality design project',
    link: '/projects/project-10',
    title: 'Hospitality Design',
  },
  {
    id: '11',
    src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
    alt: 'Educational facility project',
    link: '/projects/project-11',
    title: 'Educational Facility',
  },
  {
    id: '12',
    src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    alt: 'Retail space project',
    link: '/projects/project-12',
    title: 'Retail Space',
  },
];

export const Default: Story = {
  args: {
    images: defaultImages,
    panelWidth: 300,
    panelRatio: 0.72,
    autoRotateDegPerSec: 8,
    initialRotationDeg: 0,
    spacingFactor: 1.05,
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
    panelWidth: 400,
    panelRatio: 0.75,
  },
};

export const SmallPanels: Story = {
  args: {
    ...Default.args,
    panelWidth: 250,
    panelRatio: 0.7,
  },
};

export const MoreSpacing: Story = {
  args: {
    ...Default.args,
    spacingFactor: 1.1,
  },
};

export const LessSpacing: Story = {
  args: {
    ...Default.args,
    spacingFactor: 1.02,
  },
};

export const FewImages: Story = {
  args: {
    ...Default.args,
    images: defaultImages.slice(0, 6),
  },
};

export const ManyImages: Story = {
  args: {
    ...Default.args,
    images: [
      ...defaultImages,
      ...defaultImages.slice(0, 6).map((img, i) => ({
        ...img,
        id: `extra-${i}`,
        title: `${img.title} (Copy)`,
      })),
    ],
  },
};

