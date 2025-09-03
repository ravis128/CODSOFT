import React from 'react';
import { cn } from '../../utils/cn';

const Skeleton = ({ className }) => (
  <div className={cn('animate-pulse rounded-md bg-muted', className)} />
);

export default Skeleton;


