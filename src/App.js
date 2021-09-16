import React,{ useState, useEffect} from 'react';

const Header = () =>{
  let arr =[
    {en: 'original', vi: 'nguyên bản', ipa: '/əˈrɪdʒ.ən.əl/' , type: 'adv',unit: 1},
    {en: 'culture', vi: 'văn hóa', ipa: '/ˈkʌl.tʃər/' , type: 'n',unit: 1},
    {en: 'vocabulary', vi: 'từ vựng', ipa: ' /vəˈkæb.jə.lər.i/' , type: 'n',unit: 1},
    {en: 'follow', vi: 'theo dõi', ipa: '/ˈfɒl.əʊ/' , type: 'v',unit: 1},
    {en: 'course', vi: 'khóa học', ipa: '/kɔːs/' , type: 'n',unit: 1},
    {en: 'vistor', vi: 'khách thăm quan', ipa: '/ˈvɪz.ɪ.tər/' , type: 'adv',unit: 1},
    {en: 'beginner', vi: 'người mới', ipa: '/bɪˈɡɪn.ər/' , type: 'n',unit: 1},
    {en: 'abroad', vi: 'ở nước ngoài', ipa: '/əˈbrɔːd/' , type: 'adv',unit: 1},
    {en: 'confident', vi: 'tự tin', ipa: '/ˈkɒn.fɪ.dənt/' , type: 'adj',unit: 1},
    {en: 'speaker', vi: 'người nói', ipa: '/ˈspiː.kər/' , type: 'n',unit: 1},
    {en: 'skill', vi: 'kỹ năng', ipa: '/skɪl/' , type: 'n',unit: 1},
    {en: 'scared', vi: 'sợ hãi', ipa: '/skeəd/' , type: 'adj',unit: 1},
    {en: 'progress', vi: 'tiến bộ', ipa: '/ˈprəʊ.ɡres/' , type: 'n',unit: 1},
    {en: 'difficulty', vi: 'sự khó khăn', ipa: '/ˈdɪf.ɪ.kəl.ti/' , type: 'n',unit: 1},
    {en: 'foreigner', vi: 'người nước ngoài', ipa: '/ˈfɒr.ə.nər/' , type: 'n',unit: 1},
    {en: 'communicate', vi: 'giao tiếp', ipa: '/kəˈmjuː.nɪ.keɪt/' , type: 'v',unit: 1},
    {en: 'idea', vi: 'ý tưởng', ipa: '/ʃaɪ/' , type: 'adj',unit: 1},
    {en: 'topic', vi: 'chủ đề', ipa: '/ˈtɒp.ɪk/' , type: 'n',unit: 1},
    {en: 'language', vi: 'ngôn ngữ', ipa: '/ˈlæŋ.ɡwɪdʒ/' , type: 'n',unit: 1},
    {en: 'conversation', vi: 'cuộc trò truyện', ipa: '/ˌkɒn.vəˈseɪ.ʃən/' , type: 'n',unit: 1},
    {en: 'certificate', vi: 'chứng chỉ', ipa: '/səˈtɪf.ɪ.kət/' , type: 'n',unit: 1},
    {en: 'understand', vi: 'hiểu', ipa: '/ˌʌn.dəˈstænd/' , type: 'adv',unit: 1},
    {en: 'follow one dream', vi: 'theo đuổi ước mơ của bản thân', ipa: '' , type: 'cum',unit: 1},
    {en: 'take an English course', vi: 'tham gia khóa học tiếng anh', ipa: '' , type: 'cum',unit: 1},
    {en: 'learn new things', vi: 'học thứ mới', ipa: '' , type: 'cum',unit: 1},
    {en: 'express one ideas', vi: 'thể hiện ý tưởng của mình', ipa: '' , type: 'cum',unit: 1},
    {en: 'make friends with someone', vi: 'làm bạn với ai đó', ipa: '' , type: 'cum',unit: 1},
    {en: 'learn a new language', vi: 'học một ngôn ngữ mới', ipa: '' , type: 'cum',unit: 1},
    {en: 'start university', vi: 'vào đại học', ipa: '' , type: 'cum',unit: 2},
    {en: 'finish university', vi: 'xong đại học', ipa: '' , type: 'cum',unit: 2},
    {en: 'pass with flyinh colour', vi: 'đạt điểm cao trong kì thi', ipa: '' , type: 'cum',unit: 2},
    {en: 'take an exam', vi: 'làm bài kiểm tra', ipa: '' , type: 'cum',unit: 2},
    {en: 'pass an exan', vi: 'qua bài kiểm tra', ipa: '' , type: 'cum',unit: 2},
    {en: 'cram for', vi: 'học gạo để chuẩn bị cho', ipa: '' , type: 'cum',unit: 2},
    {en: 'enroll', vi: 'nhập học', ipa: ' /ɪnˈroʊl/' , type: 'v',unit: 2},
    {en: 'announce', vi: 'thông báo', ipa: '/əˈnaʊns/ ' , type: 'v',unit: 2},
    {en: 'kindergarten', vi: 'mẫu giáo', ipa: '/ˈkɪn.dəˌɡɑː.tən/' , type: 'n',unit: 2},
    {en: 'assignment', vi: 'bài tập', ipa: '/əˈsaɪn.mənt/' , type: 'n',unit: 2},
    {en: 'curriculum', vi: 'chương trình giảng dạy', ipa: '/kəˈrɪk.jə.ləm/' , type: 'n',unit: 2},
    {en: 'engineering', vi: 'nghành kỹ sư', ipa: '/ˌen.dʒɪˈnɪə.rɪŋ/' , type: 'n',unit: 2},
    {en: 'primary', vi: 'tiểu học', ipa: '/ˈpraɪ.mər.i/' , type: 'n',unit: 2},
    {en: 'uniform', vi: 'đồng phục', ipa: '/ˈjuː.nɪ.fɔːm/' , type: 'n',unit: 2},
    {en: 'revise', vi: 'ôn tập', ipa: '/rɪˈvaɪz/' , type: 'v',unit: 2},
    {en: 'art', vi: 'nghệ thuật', ipa: ' /ɑːt/' , type: 'n',unit: 2},
    {en: 'absent', vi: 'vắng mặt', ipa: 'ˈæb.sənt/' , type: 'adj',unit: 2},
    {en: 'popular', vi: 'thịnh hành', ipa: '/ˈpɒp.jə.lər/' , type: 'adj',unit: 2},
    {en: 'science', vi: 'khoa học', ipa: '/ˈsaɪ.əns/' , type: 'n',unit: 2},
    {en: 'subject', vi: 'môn học', ipa: '/ˈsʌb.dʒekt/' , type: 'n',unit: 2},
    {en: 'secondary', vi: 'cấp 2', ipa: '/ˈsek.ən.dri/' , type: 'adj',unit: 2},
    {en: 'mathematics', vi: 'toán học', ipa: '/ˌmæθˈmæt.ɪks/' , type: 'n',unit: 2},
    {en: 'succeed', vi: 'thành công', ipa: '/səkˈsiːd/' , type: 'v',unit: 2},
    {en: 'nervous', vi: 'lo lắng', ipa: '/ˈnɜː.vəs/' , type: 'adj',unit: 2},
    {en: 'continue', vi: 'tiếp tục', ipa: '/kənˈtɪn.juː/' , type: 'v',unit: 2},
    {en: 'dropout', vi: 'người bỏ học', ipa: '/ˈdrɑːp.aʊt/' , type: 'n',unit: 2},
    {en: 'grade', vi: 'điểm số', ipa: '/ɡreɪd/' , type: 'n',unit: 2},
    {en: 'attend', vi: 'tham gia', ipa: '/əˈtend/' , type: 'v',unit: 2},
    {en: 'term', vi: 'học kì', ipa: '/tɜːm/' , type: 'n',unit: 2},
    {en: 'memorise', vi: 'học thuộc', ipa: '/ˈmem.ə.raɪz/' , type: 'v',unit: 3},
    {en: 'live a quite life', vi: 'sống cuộc sống bình yên', ipa: '' , type: 'cum',unit: 3},
    {en: 'healthy interest', vi: 'sở thích lành mạnh', ipa: '' , type: 'cum',unit: 3},
    {en: 'spell one name', vi: 'đánh vần tên ai đó', ipa: '' , type: 'cum',unit: 3},
    {en: 'first name', vi: 'tên riêng', ipa: '' , type: 'cum',unit: 3},
    {en: 'sur name', vi: 'họ', ipa: '' , type: 'cum',unit: 3},
    {en: 'grow up || grew up', vi: 'lớn lên', ipa: '' , type: 'cum',unit: 3},
    {en: 'beautiful', vi: 'đẹp', ipa: '/ˈbjuː.tɪ.fəl/' , type: 'adj',unit: 3},
    {en: 'favourite', vi: 'ưa thích', ipa: '/ˈfeɪ.vər.ɪt/' , type: 'adv',unit: 3},
    {en: 'crowded', vi: 'đông đúc', ipa: '/ˈkraʊ.dɪd/' , type: 'adj',unit: 3},
    {en: 'peaceful', vi: 'bình yên', ipa: '/ˈpiːs.fəl/' , type: 'adj',unit: 3},
    {en: 'centre', vi: 'trung tâm', ipa: '/ˈsen.tər/' , type: 'n',unit: 3},
    {en: 'north', vi: 'phía Bắc', ipa: ' /nɔːθ/' , type: 'n',unit: 3},
    {en: 'address', vi: 'địa chỉ', ipa: '/əˈdres/' , type: 'n',unit: 3},
    {en: 'call', vi: 'gọi', ipa: '/kɔːl/' , type: 'v',unit: 3},
    {en: 'common', vi: 'phổ biến', ipa: '/ˈkɒm.ən/' , type: 'adj',unit: 3},
    {en: 'south', vi: 'phía Nam', ipa: '/saʊθ/' , type: 'n',unit: 3},
    {en: 'town', vi: 'thị trấn', ipa: '/taʊn/' , type: 'n',unit: 3},
    {en: 'distance', vi: 'khoảng cách', ipa: '/ˈdɪs.təns/' , type: 'n',unit: 3},
    {en: 'live', vi: 'sống', ipa: '/lɪv/' , type: 'v',unit: 3},
    {en: 'meaning', vi: 'ý nghĩa', ipa: '/ˈmiː.nɪŋ/' , type: 'n',unit: 3},
    {en: 'spell', vi: 'đánh vần', ipa: '/spel/' , type: 'v',unit: 3},
    {en: 'contact', vi: 'sự liên lạc', ipa: '/ˈkɒn.tækt/' , type: 'n',unit: 3},
    {en: 'hometown', vi: 'quê hương', ipa: '/ˈhəʊm.taʊn/' , type: 'n',unit: 3},
    {en: 'sign', vi: 'ký tên', ipa: '/saɪn/' , type: 'v',unit: 3},
    {en: 'surname || lastname || secondname', vi: 'họ', ipa: '/ˈsɜː.neɪm/' , type: 'n',unit: 3},
    {en: 'tell', vi: 'gọi', ipa: '/tel/' , type: 'v',unit: 3},
    {en: 'special', vi: 'đặc biệt', ipa: '/ˈspeʃ.əl/' , type: 'adj',unit: 3},
    {en: 'describe', vi: 'mô tả', ipa: '/dɪˈskraɪb/' , type: 'v',unit: 3},
    {en: 'nickname', vi: 'biệt danh', ipa: '/ˈnɪk.neɪm/' , type: 'n',unit: 3},
    {en: 'know', vi: 'biết', ipa: '/nəʊ/' , type: 'v',unit: 3},
    {en: 'work to tight deadlines', vi: 'làm việc với hạn chót gấp rút', ipa: '' , type: 'cum',unit: 4},
    {en: 'paid-well job', vi: 'việc làm lương cao', ipa: '' , type: 'cum',unit: 4},
    {en: 'be responsible for', vi: 'có trách nhiệm với ', ipa: '' , type: 'cum',unit: 4},
    {en: 'dead-end job', vi: 'công việc không có cơ hội thăng tiến', ipa: '' , type: 'cum',unit: 4},
    {en: 'show up for work', vi: 'có mặt tại chỗ làm', ipa: '' , type: 'cum',unit: 4},
    {en: 'work long hours', vi: 'làm việc ca dài', ipa: '' , type: 'cum',unit: 4},
    {en: 'manager', vi: 'người quản lý', ipa: '/ˈmæn.ɪ.dʒər/' , type: 'n',unit: 4},
    {en: 'challenging', vi: 'tính thách thức', ipa: '/ˈtʃæl.ɪn.dʒɪŋ/' , type: 'adj',unit: 4},
    {en: 'salesperson', vi: 'người bán hàng', ipa: '/ˈseɪlzˌpɜː.sən/' , type: 'n',unit: 4},
    {en: 'pilot', vi: 'phi công', ipa: '/ˈpaɪ.lət/' , type: 'n',unit: 4},
    {en: 'form', vi: 'mẫu đơn', ipa: '/fɔːm/' , type: 'v',unit: 4},
    {en: 'acceptable', vi: 'chấp nhận được', ipa: '/əkˈsept.ə.bəl/' , type: 'adj',unit: 4},
    {en: 'accountant', vi: 'kế toán', ipa: '/əˈkaʊn.tənt/' , type: 'n',unit: 4},
    {en: 'journalist', vi: 'nhà báo', ipa: '/ˈdʒɜː.nə.lɪst/' , type: 'n',unit: 4},
    {en: 'open', vi: 'mở', ipa: '/ˈəʊ.pən/' , type: 'adj',unit: 4},
    {en: 'employer', vi: 'nhà tuyển dụng', ipa: '/ɪmˈplɔɪ.ər/' , type: 'n',unit: 4},
    {en: 'offer', vi: 'đề xuất', ipa: '/ˈɒf.ər/' , type: 'v',unit: 4},
    {en: 'receptionist', vi: 'lễ tân', ipa: '/rɪˈsep.ʃən.ɪst/' , type: 'n',unit: 4},
    {en: 'employee', vi: 'nhân viên', ipa: '/ɪmˈplɔɪ.iː/' , type: 'n',unit: 4},
    {en: 'company', vi: 'công ty', ipa: '/ˈkʌm.pə.ni/' , type: 'n',unit: 4},
    {en: 'design', vi: 'thiết kế', ipa: '/dɪˈzaɪn/' , type: 'v',unit: 4},
    {en: 'cook', vi: 'người đầu bếp', ipa: '/kʊk/' , type: 'n',unit: 4},
    {en: 'assistant', vi: 'trợ lý', ipa: '/əˈsɪs.tənt/' , type: 'n',unit: 4},
    {en: 'engineer', vi: 'kỹ sư', ipa: '/ˌen.dʒɪˈnɪər/' , type: 'n',unit: 4},
    {en: 'hairdreeser', vi: 'thợ cắt tóc', ipa: '/ˈheəˌdres.ər/' , type: 'n',unit: 4},
    {en: 'housewife', vi: 'nội trợ', ipa: '/ˈhaʊs.waɪf/' , type: 'n',unit: 4},
    {en: 'lawyer', vi: 'luật sư', ipa: '/ˈlɔɪ.ər/' , type: 'n',unit: 4},
    {en: 'punctual', vi: 'đúng giờ', ipa: '/ˈpʌŋk.tʃu.əl/' , type: 'adj',unit: 4},
    {en: 'architect', vi: 'kiến trúc sư', ipa: '/ˈɑː.kɪ.tekt/' , type: 'n',unit: 4},
    {en: 'owner', vi: 'người chủ', ipa: '/ˈəʊ.nər/' , type: 'n',unit: 4},
    {en: 'file', vi: 'cặp đựng tài liệu', ipa: '/faɪl/' , type: 'n',unit: 5},
    {en: 'arrange', vi: 'sắp xếp', ipa: '/əˈreɪndʒ/' , type: 'v',unit: 5},
    {en: 'jobless', vi: 'thất nghiệp', ipa: '/ˈdʒɒb.ləs/' , type: 'adj',unit: 5},
    {en: 'designer', vi: 'nhà thiết kế', ipa: '/dɪˈzaɪ.nər/' , type: 'n',unit: 5},
    {en: 'filmmaker', vi: 'nhà làm phim', ipa: '/ˈfɪlmˌmeɪ.kər/' , type: 'n',unit: 5},
    {en: 'prepare', vi: 'chuẩn bị', ipa: ' /prɪˈpeər/' , type: 'v',unit: 5},
    {en: 'freelancer', vi: 'người làm việc tự do', ipa: '/ˈfriː.lɑːn.sər/' , type: 'n',unit: 5},
    {en: 'reporter', vi: 'phóng viên', ipa: '/rɪˈpɔː.tər/' , type: 'n',unit: 5},
    {en: 'expert', vi: 'chuyên gia', ipa: '/ˈek.spɜːt/' , type: 'n',unit: 5},
    {en: 'document', vi: 'tài liệu', ipa: '/ˈdɒk.jə.mənt/' , type: 'n',unit: 5},
    {en: 'contract', vi: 'hợp đồng', ipa: '/ˈkɒn.trækt/' , type: 'n',unit: 5},
    {en: 'bank teller', vi: 'giao dịch viên ngân hàng', ipa: '' , type: 'n',unit: 5},
    {en: 'application', vi: 'đơn xin', ipa: '/ˌæp.lɪˈkeɪ.ʃən/' , type: 'n',unit: 5},
    {en: 'nurse', vi: 'y tá', ipa: '/nɜːs/' , type: 'n',unit: 5},
    {en: 'customer', vi: 'khách hàng', ipa: '/ˈkʌs.tə.mər/' , type: 'n',unit: 5},
    {en: 'builder', vi: 'thợ xây', ipa: '/ˈbɪl.dər/' , type: 'n',unit: 5},
    {en: 'qualified', vi: 'đủ khả năng', ipa: 'ˈkwɒl.ɪ.faɪd/' , type: 'n',unit: 5},
    {en: 'photographer', vi: 'thợ chụp ảnh', ipa: '/fəˈtɒɡ.rə.fər/' , type: 'n',unit: 5},
    {en: 'career', vi: 'nghề nghiệp', ipa: '/kəˈrɪər/' , type: 'n',unit: 5},
    {en: 'interview', vi: 'phỏng vấn', ipa: '/ˈɪn.tə.vjuː/' , type: 'n',unit: 5},
    {en: 'secretary', vi: 'thư ký', ipa: '/ˈsek.rə.tər.i/' , type: 'n',unit: 5},
    {en: 'tool', vi: 'công cụ', ipa: '/tuːl/' , type: 'n',unit: 5},
    {en: 'get a job', vi: 'có công việc làm', ipa: '' , type: 'n',unit: 5},
    {en: 'musician', vi: 'nhạc sĩ', ipa: '/mjuːˈzɪʃ.ən/' , type: 'n',unit: 5},
    {en: 'in big trouble', vi: 'gặp rắc rối to', ipa: '' , type: 'cum',unit: 6},
    {en: 'be paid on time', vi: 'trả đúng hạn', ipa: '' , type: 'cum',unit: 6},
    {en: 'run out of money', vi: 'hết tiền', ipa: '' , type: 'cum',unit: 6},
    {en: 'run short of money', vi: 'thiếu tiền', ipa: '' , type: 'cum',unit: 6},
    {en: 'pay rent and bill', vi: 'trả tiền thuê nhà và hóa đơn', ipa: '' , type: 'cum',unit: 6},
    {en: 'cost of living', vi: 'chi phí sinh hoạt', ipa: '' , type: 'cum',unit: 6},
    {en: 'rent', vi: 'tiền thuê nhà', ipa: '/rent' , type: 'n',unit: 6},
    {en: 'rich', vi: 'giàu', ipa: ' /rɪtʃ/' , type: 'adj',unit: 6},
    {en: 'decrease', vi: 'giảm', ipa: '/dɪˈkriːs/' , type: 'v',unit: 6},
    {en: 'price', vi: 'giá tiền', ipa: '/praɪs/' , type: 'n',unit: 6},
    {en: 'lend', vi: 'cho vay', ipa: '/lend/' , type: 'v',unit: 6},
    {en: 'expensive', vi: 'đắt', ipa: '/ɪkˈspen.sɪv/' , type: 'cum',unit: 6},
    {en: 'cost', vi: 'chi phí', ipa: ' /kɔːst/' , type: 'n',unit: 6},
    {en: 'spend', vi: 'chi tiêu', ipa: '/spend/' , type: 'v',unit: 6},
    {en: 'resonable', vi: 'phải chăng', ipa: '/ˈriːznəbl/' , type: 'adj',unit: 6},
    {en: 'due', vi: 'hạn', ipa: '/djuː/' , type: 'cum',unit: 6},
    {en: 'manage', vi: 'quản lý', ipa: '/ˈmænɪdʒ/' , type: 'v',unit: 6},
    {en: 'broke', vi: 'cháy túi', ipa: ' /brəʊk/' , type: 'adj',unit: 6},
    {en: 'fee', vi: 'lệ phí', ipa: ' /fi:/' , type: 'n',unit: 6},
    {en: 'luxury', vi: 'xa hoa', ipa: '/ˈlʌkʃəri/' , type: 'n',unit: 6},
    {en: 'generous', vi: 'hào phóng', ipa: '/ˈdʒenərəs/' , type: 'adj',unit: 6},
    {en: 'owe', vi: 'nợ', ipa: '/əʊ/' , type: 'adj',unit: 6},
    {en: 'save', vi: 'tiết kiệm', ipa: '/seɪv/' , type: 'v',unit: 6},
    {en: 'bill', vi: 'hóa đơn', ipa: '/bɪl/' , type: 'n',unit: 6},
    {en: 'cheap', vi: 'rẻ', ipa: '/tʃiːp/' , type: 'adj',unit: 6},
    {en: 'note', vi: 'tờ tiền', ipa: '/nəʊt/' , type: 'n',unit: 6},
    {en: 'borrow', vi: 'mượn', ipa: '/ˈbɒrəʊ/' , type: 'v',unit: 6},
    {en: 'raise', vi: 'tăng', ipa: '/reɪz/' , type: 'v',unit: 6},
    {en: 'wasteful', vi: 'phí phạm', ipa: '/ˈweɪstfl/' , type: 'adj',unit: 6},
    {en: 'metro system', vi: 'hệ thống tàu ngầm', ipa: '' , type: 'cum',unit: 7},
    {en: 'entertaiment options', vi: 'lựa chọn giải trí', ipa: '' , type: 'cum',unit: 7},
    {en: 'put up with', vi: 'chịu đựng', ipa: '' , type: 'cum',unit: 7},
    {en: 'quality of life', vi: 'chất lượng cuộc sống', ipa: '' , type: 'cum',unit: 7},
    {en: 'pace of life', vi: 'nhịp sống', ipa: '' , type: 'cum',unit: 7},
    {en: 'get used to', vi: 'quen dần với', ipa: '' , type: 'cum',unit: 7},
    {en: 'atmosphere', vi: 'bầu không khí', ipa: '/ˈætməsfɪə(r)/' , type: 'n',unit: 7},
    {en: 'convenient', vi: 'tiện lợi', ipa: '/kənˈviːniənt/' , type: 'adj',unit: 7},
    {en: 'capital', vi: 'thủ đồ', ipa: '/ˈkæpɪtl/' , type: 'n',unit: 7},
    {en: 'nightlife', vi: 'cuộc sống về đêm', ipa: '/ˈnaɪtlaɪf/' , type: 'n',unit: 7},
    {en: 'service', vi: 'dịch vụ', ipa: '/ˈsɜːvɪs/' , type: 'n',unit: 7},
    {en: 'modern', vi: 'hiện đại', ipa: '/ˈmɒdn/' , type: 'adj',unit: 7},
    {en: 'quality', vi: 'chất lượng', ipa: '/ˈkwɒləti/' , type: 'n',unit: 7},
    {en: 'pavement', vi: 'vỉa hè', ipa: '/ˈpeɪvmənt/' , type: 'n',unit: 7},
    {en: 'various', vi: 'đa dạng', ipa: '/ˈveəriəs/' , type: 'adj',unit: 7},
  ]
  const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }
  const [list, setList] = useState();
  const [n, setN] = useState(shuffle(0));
  const [text, setText] = useState();
  const [unit, setUnit] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setList(shuffle(arr));
  },[]);


  const _nextVocabulary = (e) => {
    if(e){
      setN(n+1);
      setText("");
    }
  }
  const _changeText = (e) =>{
    if(e){
      let target = e.target;
      let value = target.value;
      setText(value);
    }
  }
  const _onChangeType = (e) =>{
    if(e){
      let target = e.target;
      let value = target.value;
      setType(value);
    }
  }
  const _onChangeUnit = (e) =>{
    if(e){
      let target = e.target;
      let value = target.value;
      setUnit(parseInt(value)); 
    }
  }
  const _onFilter = (e) =>{
    let newList = [];
    list.forEach(element => {
      if(element.unit == unit){
        if(element.type == type){
          newList.push(element);
        }else{
          if(element.type !== 'cum' && type == 'tu-vung'){
            newList.push(element);
          }
        }
      }
    });
    setList(newList);
  }

  const _talk = () =>{
    var msg = new SpeechSynthesisUtterance(list[n].en);
    window.speechSynthesis.speak(msg);
  } 
  if(!list || list.length == 0) return <div></div>;
  
  console.log(list);
  console.log(text);
 
  return(
    <div className="learn-english">
      <div className="search">
        <p>Tìm kiếm </p>
        <input onChange={(e) => _onChangeUnit (e)} placeholder="Unit?" className="wl-input" type="text"/>
        <select onChange={(e) => _onChangeType (e)}>
          <option>---</option>
          <option value="cum">Cụm từ vựng</option>
          <option value="tu-vung">Từ vựng</option>
        </select>
        <button className="wl-button" onClick={(e) => _onFilter(e)}> Filter </button>
      </div>
      <div className="flash-card">
        <p id="en">{list[n].vi}</p>
        <input placeholder="Từ" className="wl-input" value={text} onChange={(e) => _changeText(e)} type="text"/>
        <div style={{display: (text == list[n].en ? " block" : "none")}} >
          <p id="vi">{list[n].en}</p>
          <p id="ipa">{list[n].ipa}</p>
          <button onClick={(e) => _talk (e)}> Voice </button>
          <button onClick={(e) => _nextVocabulary(e)}>next</button>
        </div>
      </div>
    </div>
  )
}

export default Header;