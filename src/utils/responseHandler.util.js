const successResponse = (res, data, message = 'success', status = 200) => {
    return res.status(status).json({ success: true, message, data });
};

export default { successResponse };
