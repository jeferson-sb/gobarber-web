import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.header`
  padding: 32px 0;
  background: var(--color-dark-100);
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: var(--color-gray-600);
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: var(--color-gray-200);
    }

    a {
      text-decoration: none;
      color: var(--color-primary);

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: var(--color-primary);
    display: flex;
    align-items: center;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: var(--color-primary);
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: var(--color-gray-600);
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: var(--color-dark-liver);
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: var(--color-primary);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: var(--color-white);
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: var(--color-gray-600);

      svg {
        color: var(--color-primary);
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: var(--color-gray-600);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--color-dark-liver);
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: var(--color-gray-600);
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--color-gray-200);
    width: 70px;

    svg {
      color: var(--color-primary);
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: var(--color-dark-liver);
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: var(--color-white);
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: var(--color-dark-100);
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: var(--color-dark-liver);
    border-radius: 10px;
    color: var(--color-white);
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: var(--color-dark-100);
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: var(--color-gray-400) !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: var(--color-primary) !important;
    border-radius: 10px;
    color: var(--color-dark-100) !important;
  }
`;
