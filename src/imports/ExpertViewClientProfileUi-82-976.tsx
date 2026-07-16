import svgPaths from "./svg-psknlfcjva";

function ChevronLeft() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="ChevronLeft">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 14">
            <path d="M7 13L1 7L7 1" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronLeft />
      </div>
    </div>
  );
}

function H() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="h1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] whitespace-nowrap">Invoices – Rachit</p>
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[24px] relative shrink-0 w-[6.5px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#d1d5dc] text-[16px] top-[-2px] whitespace-nowrap">•</p>
      </div>
    </div>
  );
}

function Option() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option1() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Option2() {
  return <div className="h-0 shrink-0 w-full" data-name="option" />;
}

function Select() {
  return (
    <div className="h-[23px] relative shrink-0 w-[91px]" data-name="select">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[-446.844px] pr-[537.844px] pt-[-24.5px] relative size-full">
        <Option />
        <Option1 />
        <Option2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <H />
        <Span />
        <Select />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[338.344px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <Container3 />
      </div>
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[73.906px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Client Type:</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#3b82f6] h-[32px] relative rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[118.5px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Mantra Client</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative rounded-[33554400px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px] text-center whitespace-nowrap">Personal Client</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f3f4f6] flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[33554400px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[4px] px-[4px] relative size-full">
        <Button1 />
        <Button2 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[40px] relative shrink-0 w-[334.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span1 />
        <Container5 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[16px] px-[199.5px] top-0 w-[1551px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function FileText() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="FileText">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="FileText">
          <path d={svgPaths.p3713e00} id="Vector" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd2076c0} id="Vector_2" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, #2B7FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function H1() {
  return (
    <div className="h-[28px] relative shrink-0 w-[102.688px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic relative shrink-0 text-[#101828] text-[20px] whitespace-nowrap">All Invoices</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[8px] h-[28px] items-center relative shrink-0 w-full" data-name="Container">
      <FileText />
      <H1 />
    </div>
  );
}

function Th() {
  return (
    <div className="absolute h-[45px] left-0 top-0 w-[124.609px]" data-name="th">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[11.5px] whitespace-nowrap">Invoice #</p>
    </div>
  );
}

function Th1() {
  return (
    <div className="absolute h-[45px] left-[124.61px] top-0 w-[167.766px]" data-name="th">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[11.5px] whitespace-nowrap">Client</p>
    </div>
  );
}

function Th2() {
  return (
    <div className="absolute h-[45px] left-[292.38px] top-0 w-[150.531px]" data-name="th">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[11.5px] whitespace-nowrap">Issued Date</p>
    </div>
  );
}

function Th3() {
  return (
    <div className="absolute h-[45px] left-[442.91px] top-0 w-[150.531px]" data-name="th">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#364153] text-[14px] top-[11.5px] whitespace-nowrap">Due Date</p>
    </div>
  );
}

function Th4() {
  return (
    <div className="absolute h-[45px] left-[593.44px] top-0 w-[116.438px]" data-name="th">
      <p className="-translate-x-full absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[100.88px] not-italic text-[#364153] text-[14px] text-right top-[11.5px] whitespace-nowrap">Amount</p>
    </div>
  );
}

function Th5() {
  return (
    <div className="absolute h-[45px] left-[709.88px] top-0 w-[111.5px]" data-name="th">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[55.31px] not-italic text-[#364153] text-[14px] text-center top-[11.5px] whitespace-nowrap">Status</p>
    </div>
  );
}

function Th6() {
  return (
    <div className="absolute h-[45px] left-[821.38px] top-0 w-[234.625px]" data-name="th">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[118.17px] not-italic text-[#364153] text-[14px] text-center top-[11.5px] whitespace-nowrap">Actions</p>
    </div>
  );
}

function Tr() {
  return (
    <div className="absolute h-[45px] left-0 top-[-1px] w-[1056px]" data-name="tr">
      <Th />
      <Th1 />
      <Th2 />
      <Th3 />
      <Th4 />
      <Th5 />
      <Th6 />
    </div>
  );
}

function Thead() {
  return (
    <div className="absolute bg-[#f9fafb] border-[#e5e7eb] border-b border-solid border-t h-[45px] left-0 top-[0.5px] w-[1056px]" data-name="thead">
      <Tr />
    </div>
  );
}

function Td() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[124.609px]" data-name="td">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#155dfc] text-[14px] top-[20.5px] whitespace-nowrap">#001</p>
    </div>
  );
}

function Td1() {
  return (
    <div className="absolute h-[65px] left-[124.61px] top-0 w-[167.766px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[20.5px] whitespace-nowrap">Rachit Sharma</p>
    </div>
  );
}

function Td2() {
  return (
    <div className="absolute h-[65px] left-[292.38px] top-0 w-[150.531px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[20.5px] whitespace-nowrap">Jan 15, 2026</p>
    </div>
  );
}

function Td3() {
  return (
    <div className="absolute h-[65px] left-[442.91px] top-0 w-[150.531px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[20.5px] whitespace-nowrap">Jan 29, 2026</p>
    </div>
  );
}

function Td4() {
  return (
    <div className="absolute h-[65px] left-[593.44px] top-0 w-[116.438px]" data-name="td">
      <p className="-translate-x-full absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[100.56px] not-italic text-[#101828] text-[14px] text-right top-[20.5px] whitespace-nowrap">$105.00</p>
    </div>
  );
}

function Span2() {
  return (
    <div className="absolute bg-[#dcfce7] content-stretch flex h-[24px] items-start left-[33.63px] px-[10px] py-[4px] rounded-[33554400px] top-[21px] w-[44.25px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#008236] text-[12px] text-center whitespace-nowrap">Sent</p>
    </div>
  );
}

function Td5() {
  return (
    <div className="absolute h-[65px] left-[709.88px] top-0 w-[111.5px]" data-name="td">
      <Span2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[32px] relative shrink-0 w-[54.672px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[12px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#155dfc] text-[14px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Send() {
  return (
    <div className="absolute left-[12px] size-[14px] top-[9px]" data-name="Send">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_82_980)" id="Send">
          <path d={svgPaths.p3fccf600} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3bf11880} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_82_980">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#eff6ff] h-[32px] relative rounded-[10px] shrink-0 w-[73.672px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Send />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[46.5px] not-italic text-[#155dfc] text-[14px] text-center top-[5px] whitespace-nowrap">Send</p>
      </div>
    </div>
  );
}

function Div() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center justify-center left-[16px] top-[16.5px] w-[202.625px]" data-name="div">
      <Button3 />
      <Button4 />
    </div>
  );
}

function Td6() {
  return (
    <div className="absolute h-[65px] left-[821.38px] top-0 w-[234.625px]" data-name="td">
      <Div />
    </div>
  );
}

function Tr1() {
  return (
    <div className="absolute border-[#f3f4f6] border-b border-solid h-[65px] left-0 top-0 w-[1056px]" data-name="tr">
      <Td />
      <Td1 />
      <Td2 />
      <Td3 />
      <Td4 />
      <Td5 />
      <Td6 />
    </div>
  );
}

function Td7() {
  return (
    <div className="absolute h-[64.5px] left-0 top-0 w-[124.609px]" data-name="td">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#155dfc] text-[14px] top-[20.5px] whitespace-nowrap">#002</p>
    </div>
  );
}

function Td8() {
  return (
    <div className="absolute h-[64.5px] left-[124.61px] top-0 w-[167.766px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#101828] text-[14px] top-[20.5px] whitespace-nowrap">Rachit Sharma</p>
    </div>
  );
}

function Td9() {
  return (
    <div className="absolute h-[64.5px] left-[292.38px] top-0 w-[150.531px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[20.5px] whitespace-nowrap">Jan 22, 2026</p>
    </div>
  );
}

function Td10() {
  return (
    <div className="absolute h-[64.5px] left-[442.91px] top-0 w-[150.531px]" data-name="td">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[16px] not-italic text-[#4a5565] text-[14px] top-[20.5px] whitespace-nowrap">Feb 5, 2026</p>
    </div>
  );
}

function Td11() {
  return (
    <div className="absolute h-[64.5px] left-[593.44px] top-0 w-[116.438px]" data-name="td">
      <p className="-translate-x-full absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[100.72px] not-italic text-[#101828] text-[14px] text-right top-[20.5px] whitespace-nowrap">$78.75</p>
    </div>
  );
}

function Span3() {
  return (
    <div className="absolute bg-[#f3f4f6] content-stretch flex h-[24px] items-start left-[31.73px] px-[10px] py-[4px] rounded-[33554400px] top-[21px] w-[48.016px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] text-center whitespace-nowrap">Draft</p>
    </div>
  );
}

function Td12() {
  return (
    <div className="absolute h-[64.5px] left-[709.88px] top-0 w-[111.5px]" data-name="td">
      <Span3 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[32px] relative shrink-0 w-[54.672px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[12px] py-[6px] relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#155dfc] text-[14px] text-center whitespace-nowrap">View</p>
      </div>
    </div>
  );
}

function Send1() {
  return (
    <div className="absolute left-[12px] size-[14px] top-[9px]" data-name="Send">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_82_980)" id="Send">
          <path d={svgPaths.p3fccf600} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3bf11880} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
        <defs>
          <clipPath id="clip0_82_980">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#eff6ff] h-[32px] relative rounded-[10px] shrink-0 w-[73.672px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Send1 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[46.5px] not-italic text-[#155dfc] text-[14px] text-center top-[5px] whitespace-nowrap">Send</p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center justify-center left-[16px] top-[16.5px] w-[202.625px]" data-name="div">
      <Button5 />
      <Button6 />
    </div>
  );
}

function Td13() {
  return (
    <div className="absolute h-[64.5px] left-[821.38px] top-0 w-[234.625px]" data-name="td">
      <Div1 />
    </div>
  );
}

function Tr2() {
  return (
    <div className="absolute h-[64.5px] left-0 top-[65px] w-[1056px]" data-name="tr">
      <Td7 />
      <Td8 />
      <Td9 />
      <Td10 />
      <Td11 />
      <Td12 />
      <Td13 />
    </div>
  );
}

function Tbody() {
  return (
    <div className="absolute h-[129.5px] left-0 top-[45.5px] w-[1056px]" data-name="tbody">
      <Tr1 />
      <Tr2 />
    </div>
  );
}

function Table() {
  return (
    <div className="h-[175px] overflow-clip relative shrink-0 w-full" data-name="table">
      <Thead />
      <Tbody />
    </div>
  );
}

function Plus() {
  return (
    <div className="absolute left-[462.55px] size-[20px] top-[14px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Plus">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 4.16667V15.8333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#3b82f6] h-[48px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="button">
      <Plus />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[541.55px] not-italic text-[16px] text-center text-white top-[10px] whitespace-nowrap">Create Invoice</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[24px] h-[347px] items-start left-[223.5px] pt-[24px] px-[24px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[89px] w-[1104px]" data-name="Container">
      <Container7 />
      <Table />
      <Button7 />
    </div>
  );
}

export default function ExpertViewClientProfileUi() {
  return (
    <div className="bg-[#f5f5f7] relative size-full" data-name="Expert View Client Profile UI">
      <Container />
      <Container6 />
    </div>
  );
}