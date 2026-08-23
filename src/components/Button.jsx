function Button({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
}) {
  const styles = {
    primary: {
      backgroundColor: '#2563eb',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#e5e7eb',
      color: 'black',
    },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles[variant]}
    >
      {children}
    </button>
  )
}

export default Button
