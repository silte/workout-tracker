type DetailsProps = {
  label: string;
  children: React.ReactNode | React.ReactNode[];
  isOpen?: boolean;
};

export const Details = ({ label, children, isOpen }: DetailsProps) => {
  return (
    <details open={isOpen} className="mt-4">
      <summary className="my-2">{label}</summary>
      {children}
    </details>
  );
};
