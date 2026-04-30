import os 
def list_files(directory):
    """List all files in the given directory."""
    try:
        return os.listdir(directory)
    except FileNotFoundError:
        return f"Directory '{directory}' not found."
    except PermissionError:
        return f"Permission denied for directory '{directory}'."   
def read_file(file_path):
    """Read the contents of a file."""
    try:
        with open(file_path, 'r') as file:
            return file.read()
    except FileNotFoundError:
        return f"File '{file_path}' not found."
    except PermissionError:
        return f"Permission denied for file '{file_path}'."
    
def write_file(file_path, content):
    """Write content to a file."""
    try:
        with open(file_path, 'w') as file:
            file.write(content)
            return f"Content written to '{file_path}' successfully."
    except PermissionError:
        return f"Permission denied for file '{file_path}'."