const styles = () => ({
  dropdownWrapper: {
    position: 'relative',
  },
  downshiftDropdown: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    width: '100%',
    border: '1px solid whitesmoke',
    borderBottom: 'none',
    boxShadow: '0 4px 4px 2px rgba(0, 0, 0, 0.2)',
  },
  dropdownItem: {
    padding: '0.5rem',
    cursor: 'pointer',
    borderBottom: '1px solid whitesmoke',
    fontSize: '1rem',
    textAlign: 'left',
  },
});

export default styles;
