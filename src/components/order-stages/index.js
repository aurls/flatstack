import React from 'react';
import PropTypes from 'prop-types';
import stages from '../../constants/stages';
import cn from 'classnames';
import './order-stages.scss';

const OrderStages = ({ currentStage, setOrderStage }) => {
  if (currentStage === stages.SUCCESS) return null;

  const stagesList = Object.values(stages).slice(0, 3);

  return (
    <ul className="order-stages">
      {
        stagesList.map((stage, index) => {
          const isLink = index < stagesList.indexOf(currentStage);
          const style = cn(
            'order-stages__item',
            { 'is-active': stage === currentStage },
            { 'is-link': isLink }
          );
          const handleClick = () => {
            if (isLink) {
              setOrderStage(stage);
            }
          };

          return (
            <li key={stage} className={style} onClick={handleClick}>
              {stage}
            </li>
          );
        })
      }
    </ul>
  );
};

OrderStages.propTypes = {
  currentStage: PropTypes.string.isRequired,
  setOrderStage: PropTypes.func.isRequired
};

export default OrderStages;
