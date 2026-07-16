import svgPaths from "./svg-xqo920hhio";

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
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px] whitespace-nowrap">Create Invoice</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <H />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[190.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Button />
        <Container3 />
      </div>
    </div>
  );
}

function Span() {
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
        <Span />
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
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[16px] px-[192px] top-0 w-[1536px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function P() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[129.734px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[14px]">From</p>
    </div>
  );
}

function P1() {
  return (
    <div className="absolute h-[24px] left-0 top-[28px] w-[129.734px]" data-name="p">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[#364153] text-[16px] top-[-2px] whitespace-nowrap">Dr. Sarah Johnson</p>
    </div>
  );
}

function H1() {
  return (
    <div className="absolute h-[36px] left-0 top-[68px] w-[129.734px]" data-name="h1">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[36px] left-0 not-italic text-[#101828] text-[30px] top-[-2px] whitespace-nowrap">Invoice</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[104px] relative shrink-0 w-[129.734px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <P />
        <P1 />
        <H1 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex h-[104px] items-start justify-between left-[32px] pr-[910.266px] top-[32px] w-[1040px]" data-name="Container">
      <Container8 />
    </div>
  );
}

function P2() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Bill To</p>
    </div>
  );
}

function P3() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="p">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2px] whitespace-nowrap">Rachit Sharma</p>
    </div>
  );
}

function P4() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">123 Main Street</p>
    </div>
  );
}

function P5() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">New Delhi, DL 110001</p>
    </div>
  );
}

function P6() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">India</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[96px] items-start relative shrink-0 w-full" data-name="Container">
      <P3 />
      <P4 />
      <P5 />
      <P6 />
    </div>
  );
}

function Container10() {
  return (
    <div className="col-1 content-stretch flex flex-col gap-[12px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <P2 />
      <Container11 />
    </div>
  );
}

function P7() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Invoice Details</p>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">Invoice #</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative rounded-[10px]" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[#0a0a0a] text-[16px] whitespace-nowrap">003</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] h-[42px] items-center relative shrink-0 w-full" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">Issued</p>
      </div>
    </div>
  );
}

function Input1() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative rounded-[10px]" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[12px] h-[42px] items-center relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Input1 />
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[96px]" data-name="label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[14px]">Due Date</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="flex-[1_0_0] h-[42px] min-h-px min-w-px relative rounded-[10px]" data-name="input">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] h-[42px] items-center relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <Input2 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[150px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container12() {
  return (
    <div className="col-2 content-stretch flex flex-col gap-[12px] items-start justify-self-stretch relative row-1 self-stretch shrink-0" data-name="Container">
      <P7 />
      <Container13 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[182px] left-[32px] top-[168px] w-[1040px]" data-name="Container">
      <Container10 />
      <Container12 />
    </div>
  );
}

function P8() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] uppercase">Client Information</p>
    </div>
  );
}

function Label3() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px]">Name</p>
    </div>
  );
}

function Input3() {
  return (
    <div className="h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">Rachit Sharma</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <Label3 />
      <Input3 />
    </div>
  );
}

function Label4() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px]">Phone</p>
    </div>
  );
}

function Input4() {
  return (
    <div className="h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">+91 98765 43210</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <Input4 />
    </div>
  );
}

function Label5() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px]">Email</p>
    </div>
  );
}

function Input5() {
  return (
    <div className="h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">rachit.sharma@email.com</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <Label5 />
      <Input5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[198px] items-start relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[#f9fafb] col-1 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <P8 />
        <Container19 />
      </div>
    </div>
  );
}

function P9() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] uppercase">Provider Information</p>
    </div>
  );
}

function Label6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px]">Name</p>
    </div>
  );
}

function Input6() {
  return (
    <div className="h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">Dr. Sarah Johnson</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <Label6 />
      <Input6 />
    </div>
  );
}

function Label7() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px]">Phone</p>
    </div>
  );
}

function Input7() {
  return (
    <div className="h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">+1 234 567 8900</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <Label7 />
      <Input7 />
    </div>
  );
}

function Label8() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#4a5565] text-[12px]">Email</p>
    </div>
  );
}

function Input8() {
  return (
    <div className="h-[38px] relative rounded-[10px] shrink-0 w-full" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap">sarah.johnson@mantracare.org</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[58px] items-start relative shrink-0 w-full" data-name="Container">
      <Label8 />
      <Input8 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[198px] items-start relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Container26 />
      <Container27 />
    </div>
  );
}

function Container23() {
  return (
    <div className="bg-[#f9fafb] col-2 justify-self-stretch relative rounded-[10px] row-1 self-stretch shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[17px] px-[17px] relative size-full">
        <P9 />
        <Container24 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(1,minmax(0,1fr))] h-[260px] left-[32px] top-[382px] w-[1040px]" data-name="Container">
      <Container18 />
      <Container23 />
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

function H2() {
  return (
    <div className="h-[28px] relative shrink-0 w-[83.438px]" data-name="h3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">Line Items</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-0 top-0 w-[1040px]" data-name="Container">
      <FileText />
      <H2 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[16px] top-[12px] w-[154.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Date</p>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[186.33px] top-[12px] w-[580.172px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px]">Description</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[782.5px] top-[12px] w-[154.328px]" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#364153] text-[14px] text-right">Amount</p>
    </div>
  );
}

function Container34() {
  return <div className="absolute h-[20px] left-[952.83px] top-[12px] w-[69.156px]" data-name="Container" />;
}

function Container30() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[46px] left-0 rounded-tl-[10px] rounded-tr-[10px] top-[44px] w-[1040px]" data-name="Container">
      <Container31 />
      <Container32 />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container35() {
  return <div className="absolute border-[#e5e7eb] border-b border-l border-r border-solid h-px left-0 rounded-bl-[10px] rounded-br-[10px] top-[90px] w-[1040px]" data-name="Container" />;
}

function Plus() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Plus">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[20px] left-0 top-[103px] w-[110.984px]" data-name="button">
      <Plus />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[66.5px] not-italic text-[#155dfc] text-[14px] text-center top-[-1px] whitespace-nowrap">Add Line Item</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[123px] left-[32px] top-[674px] w-[1040px]" data-name="Container">
      <Container29 />
      <Container30 />
      <Container35 />
      <Button3 />
    </div>
  );
}

function Span1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[51.797px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Subtotal</p>
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[34.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">$0.00</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Span1 />
      <Span2 />
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.313px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">Tax</p>
      </div>
    </div>
  );
}

function Input9() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-h-px min-w-px relative rounded-[4px]" data-name="input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[4px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#0a0a0a] text-[14px] text-center whitespace-nowrap">0</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[11.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#4a5565] text-[14px] whitespace-nowrap">%</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[30px] relative shrink-0 w-[110.781px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Span3 />
        <Input9 />
        <Span4 />
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[34.469px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px] whitespace-nowrap">$0.00</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex h-[46px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Span5 />
    </div>
  );
}

function Container41() {
  return (
    <div className="h-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[24px] relative shrink-0 w-[35.141px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#101828] text-[16px] top-[-2px] whitespace-nowrap">Total</p>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="h-[28px] relative shrink-0 w-[46.297px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">$0.00</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Span6 />
      <Span7 />
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[163px] relative shrink-0 w-[320px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative size-full">
        <Container38 />
        <Container39 />
        <Container41 />
        <Container42 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex h-[163px] items-start justify-end left-[32px] top-[829px] w-[1040px]" data-name="Container">
      <Container37 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#3b82f6] h-[48px] opacity-50 relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[520.14px] not-italic text-[16px] text-center text-white top-[10px] whitespace-nowrap">Save Invoice</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex flex-col h-[73px] items-start left-[32px] pt-[25px] top-[1016px] w-[1040px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Button4 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white h-[1121px] left-[216px] rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[89px] w-[1104px]" data-name="Container">
      <Container7 />
      <Container9 />
      <Container17 />
      <Container28 />
      <Container36 />
      <Container43 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#f5f5f7] h-[1226px] relative shrink-0 w-full" data-name="div">
      <Container />
      <Container6 />
    </div>
  );
}

export default function ExpertViewClientProfileUi() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Expert View Client Profile UI">
      <Div />
    </div>
  );
}