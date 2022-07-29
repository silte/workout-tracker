import React, { Children } from 'react';

interface IDescriptionListBodyProps {
  children: React.ReactNode | React.ReactNode[];
  testId?: string;
}

export const DescriptionListBody = ({
  children,
  testId,
}: IDescriptionListBodyProps): JSX.Element => {
  const isWideVaritionsCount = Children.toArray(children).filter(
    (child) =>
      (child as React.ReactElement).props.isLarge ||
      (child as React.ReactElement).props.isWide
  ).length;

  return (
    <dl
      className="grid grid-cols-2 border rounded-lg bg-gray-25"
      data-testid={testId}
    >
      {Children.map(children, (child, index) => {
        const childrenCount = Children.count(children);

        if ((child as React.ReactElement).type === React.Fragment) {
          return Children.map(
            (child as React.ReactElement).props.children,
            (fragmentChildren, fragmentChildIndex) => {
              const fragmentChildrenCount = Children.count(
                (child as React.ReactElement).props.children
              );

              const isEven = (fragmentChildIndex + 1) % 2 === 0;
              const isSecondRow = fragmentChildIndex + 1 > 2;
              const isTotalChildrenCountOdd = fragmentChildrenCount % 2 === 1;

              return (
                <section
                  className={`py-4 pl-6 pr-4 ${isEven ? 'border-l' : ''} ${
                    isSecondRow ? 'border-t' : ''
                  } ${isTotalChildrenCountOdd ? 'last:col-span-full' : ''}`}
                >
                  {fragmentChildren}
                </section>
              );
            }
          );
        }

        const isWideVarition =
          (child as React.ReactElement).props.isLarge ||
          (child as React.ReactElement).props.isWide;
        const countOfWideVaritionsBefore = Children.toArray(children)
          .slice(0, index)
          .filter(
            (currentChild) =>
              (currentChild as React.ReactElement).props.isLarge ||
              (currentChild as React.ReactElement).props.isWide
          ).length;

        const isEven = (index + 1 + countOfWideVaritionsBefore) % 2 === 0;
        const isSecondRow = index + 1 + countOfWideVaritionsBefore > 2;
        const isTotalChildrenCountOdd =
          (childrenCount + isWideVaritionsCount) % 2 === 1;

        return (
          child && (
            <section
              className={`py-4 pl-6 pr-4 ${
                isEven && !isWideVarition ? 'border-l' : ''
              } ${
                isSecondRow || (isWideVarition && index > 0) ? 'border-t' : ''
              } ${isTotalChildrenCountOdd ? 'last:col-span-full' : ''} ${
                isWideVarition ? 'col-span-full' : ''
              }`}
            >
              {child}
            </section>
          )
        );
      })}
    </dl>
  );
};
