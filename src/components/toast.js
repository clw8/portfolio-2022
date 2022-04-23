import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useToast } from "../hooks";

let hideToastTimeout = null;

const animations = {
  in: "toast-in",
  inEnd: "toast-in-end",
  out: "toast-out",
  outEnd: "toast-out-end",
};

function Toast() {
  const { toastIsShown, hideToast, toastType, toastTypes, toastMessage } =
    useToast();
  const [animation, setAnimation] = useState(animations.outEnd);
  const [initialLoad, setInitialLoad] = useState(true);

  const toastClass = (() => {
    if (toastType === toastTypes.SUCCESS) return "toast toast--success";
    else if (toastType === toastTypes.ERROR) return "toast toast--error";
  })();

  useEffect(() => {
    if (initialLoad) {
      setInitialLoad(false);
    } else {
      toastIsShown ? setAnimation(animations.in) : setAnimation(animations.out);
    }
  }, [toastIsShown]);

  const onAnimationEnd = (e) => {
    if (e.target.className.includes("toast")) {
      if (animation === animations.out) setAnimation(animations.outEnd);
      else if (animation === animations.in) setAnimation(animations.inEnd);
    }
  };

  useEffect(() => {
    if (animation === animations.inEnd) {
      hideToastTimeout = setTimeout(() => {
        toastIsShown && hideToast();
      }, 4800);
    }
  }, [animation]);

  // bug where toast hides early when showToast is called twice in quick succession
  useEffect(() => {
    if (toastIsShown) {
      clearTimeout(hideToastTimeout);
    }
  }, [toastIsShown, toastMessage]);

  return (
    <div
      role="alert"
      className={toastClass}
      animation={animation}
      onAnimationEnd={onAnimationEnd}
      onClick={hideToast}
    >
      <p>{toastMessage}</p>
    </div>
  );
}

export default Toast;
