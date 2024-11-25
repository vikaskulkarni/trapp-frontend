import styled from "styled-components";

export const HomeContainer = styled.main`
  height: 100vh;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 2rem;
`;

export const FormContainer = styled.form`
  border: 0;
  border-radius: 8px;
  background: #333;

  padding: 1rem 2rem;
  height: 30rem;

  h4 {
    color: #f7ca05;
  }

  h2 {
    margin-top: 2rem;
    font-size: 1.5rem;
    color: white;
  }
`;

export const FormGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.8rem;

  label {
    color: white;
  }

  select {
    padding: 1rem;
  }
  input {
    width: 100%;
    padding: 1rem;
    border: 0;
    border-radius: 8px;
  }

  button {
    width: 100%;
    padding: 1rem;
    font-weight: bold;
    background-color: #075985;
    border: 0;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
`;

export const ListContainer = styled.div`
  .map-height {
    height: 24.2rem;
  }
  @media (max-width: 992px) {
    .map-height {
      height: 22.5rem;
    }
  }
  border: 0;
  border-radius: 8px;
  background: #333;

  padding: 1rem 2rem;

  h4 {
    color: #f7ca05;
  }
  h2 {
    margin-top: 2rem;
    font-size: 1.5rem;
    color: white;
  }

  .leaflet-container {
    margin-top: 2rem;
  }

  div {
    select {
      color: white;
    }
    table {
      width: 100%;
      margin-top: 2rem;
      border-collapse: collapse;
      thead {
        th {
          font-weight: 600;
          text-align: left;
          padding: 0.6rem;
          color: white;
          background-color: black;
        }
      }
      tbody {
        tr:nth-child(odd) {
          background-color: #444444;
        }
        tr:nth-child(even) {
          background-color: rgba(var(--mdb-white-rgb), var(--mdb-text-opacity));
        }
        td {
          text-align: left;
          padding: 0.8rem;
          color: white;
        }
      }
    }
  }
`;
