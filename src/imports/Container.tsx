function Button() {
  return (
    <div className="flex-[191.5_0_0] h-[46px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[96.14px] not-italic text-[#6a7282] text-[14px] text-center top-[12px] whitespace-nowrap">Transcript</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="flex-[191.5_0_0] h-[46px] min-h-px min-w-px relative" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#4169e1] border-b-2 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-[14px] pt-[12px] px-[16px] relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[20px] min-h-px min-w-px not-italic relative text-[#4169e1] text-[14px] text-center">Noteworthy</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[47px] relative shrink-0 w-[383px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pb-px relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] uppercase">Conditions</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#fef3f2] content-stretch flex h-[24px] items-start left-0 px-[8px] py-[4px] rounded-[33554400px] top-0 w-[57.016px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f97066] text-[12px] text-center whitespace-nowrap">Anxiety</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#fef3f2] content-stretch flex h-[24px] items-start left-[65.02px] px-[8px] py-[4px] rounded-[33554400px] top-0 w-[65.875px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f97066] text-[12px] text-center whitespace-nowrap">Insomnia</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
    </div>
  );
}

function TagGroup() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="TagGroup">
      <Heading />
      <Container4 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] uppercase">Themes</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[#f3e8ff] content-stretch flex h-[24px] items-start left-0 px-[8px] py-[4px] rounded-[33554400px] top-0 w-[121.125px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] text-center whitespace-nowrap">Work-related stress</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-[#f3e8ff] content-stretch flex h-[24px] items-start left-[129.13px] px-[8px] py-[4px] rounded-[33554400px] top-0 w-[112.641px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] text-center whitespace-nowrap">Sleep disturbance</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[#f3e8ff] content-stretch flex h-[24px] items-start left-0 px-[8px] py-[4px] rounded-[33554400px] top-[32px] w-[127.875px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#8200db] text-[12px] text-center whitespace-nowrap">Performance anxiety</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function TagGroup1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[80px] items-start relative shrink-0 w-full" data-name="TagGroup">
      <Heading1 />
      <Container5 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] uppercase">Risk Flags</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-[#fffaeb] content-stretch flex h-[24px] items-start left-0 px-[8px] py-[4px] rounded-[33554400px] top-0 w-[111.156px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#f79009] text-[12px] text-center whitespace-nowrap">Sleep deprivation</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button7 />
    </div>
  );
}

function TagGroup2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="TagGroup">
      <Heading2 />
      <Container6 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Heading 4">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] uppercase">Procedures</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#ecfdf5] content-stretch flex h-[24px] items-start left-0 px-[8px] py-[4px] rounded-[33554400px] top-0 w-[176.891px]" data-name="Button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#10b981] text-[12px] text-center whitespace-nowrap">Progressive muscle relaxation</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button8 />
    </div>
  );
}

function TagGroup3() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[48px] items-start relative shrink-0 w-full" data-name="TagGroup">
      <Heading3 />
      <Container7 />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[272px] items-start relative shrink-0 w-full" data-name="Container">
      <TagGroup />
      <TagGroup1 />
      <TagGroup2 />
      <TagGroup3 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[796px] relative shrink-0 w-[383px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pt-[16px] px-[16px] relative rounded-[inherit] size-full">
        <Container3 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start pl-px relative size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-l border-solid inset-0 pointer-events-none" />
      <Container1 />
      <Container2 />
    </div>
  );
}